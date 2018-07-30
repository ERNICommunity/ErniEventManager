import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import {Response, Request, NextFunction} from 'express';

const User = require('./../models/user/user.controller');
const RSA_PRIVATE_KEY = fs.readFileSync('./key/private.key');

module.exports.login = async (req: Request, res: Response) => {
    const credentials = {
        login: req.body.login,
        password: req.body.password
    };
    const user = await _validateEmailAndPassword(credentials);
    if (user) {
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: 120,
            subject: user.id
        });

        res.cookie('SESSIONID', jwtBearerToken, {httpOnly: true, secure: true});
        const userReturn = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          token: jwtBearerToken
        };
        res.status(200).json(userReturn);
    } else {
        // send status 401 Unauthorized
        res.status(401).send('Unauthorized access');
    }
};

module.exports.authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers || !req.headers.authorization) {
    req.headers.authorization = 'Bearer ';
  }

  const authHeader = req.headers.authorization + ' ' || ' ';

  const token = authHeader.split(' ')[1];

  jwt.verify(token, RSA_PRIVATE_KEY, function(err, user) {
    if (err) {
      return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
    } else {
      // if everything is good, save to request for use in other routes
      // req.user = user;
      next();
    }
  });
};

module.exports.allowOptions = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

async function _validateEmailAndPassword (credentials: { login: string, password: string }) {
    const user = await User.get({id: '5b5a09903a88b120281b32b8'});
    return user;
}
