import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import {Response, NextFunction} from 'express';
import { IRequest } from '../interfaces';
import * as azureJWT from 'azure-ad-jwt';

const bcrypt = require('bcrypt');

const User = require('./../models/user/user.controller');
const RSA_PRIVATE_KEY = fs.readFileSync('./key/private.key');

class Auth {
  /**
   * Gets credentials from request and sends them to _validateEmailAndPassword.
   * If user is returned, it is hashed and token is returned
   * Otherwise 401 status is returned
   * @param {e.Request} req
   * @param {e.Response} res
   * @returns {Promise<void>}
   */
  static async login (req: IRequest, res: Response) {
    const credentials = {
      login: req.body.login,
      password: req.body.password,
      token: req.body.token
    };

    let user;

    if (credentials.login && credentials.password) {
      user = await Auth._validateEmailAndPassword(credentials);
    } else if (credentials.token) {
      user = await Auth._validateAzure(credentials);
    }

    if (user) {
      const jwtBearerToken = jwt.sign({id: user.id}, RSA_PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24,
        subject: user.id
      });

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
      res.status(401).send('Incorrect credentials');
    }
  }

  /**
   * Checks if authorization token is correct. If yes next middleware is called, otherwise 401 is returned
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   */
  static async authorize (req: IRequest, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization) {
      req.headers.authorization = 'Bearer ';
    }

    const authHeader = req.headers.authorization + ' ' || ' ';

    const token = authHeader.split(' ')[1];
    try {
      const user  = await jwt.verify(token, RSA_PRIVATE_KEY);
      req.user = user;
      next();
    } catch (err) {
      console.log('err');
      return res.status(401).send('Unauthorized access');
    }
  }

  /**
   * Allows all OPTIONS requests on dev environment
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   */
  static allowOptions(req: IRequest, res: Response, next: NextFunction) {
    const env: string = process.env.NODE_ENV || 'local';
    if (env !== 'production' && req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }

  /**
   * Validates credentials and returns user if credentials are correct
   * @param {Object} credentials
   * @param {string} credentials.login login of user
   * @param {string} credentials.password password of user
   * @returns {Promise<Object>}
   * @private
   */
  static async _validateEmailAndPassword(credentials: { login: string, password: string }) {
    if (!credentials.login || !credentials.password) {
      return;
    }
    try {
      const user = await User.getByEmail(credentials.login);
      if (user.password) {
        const correctPassword = await bcrypt.compare(credentials.password, user.password);
        if (correctPassword) {
          return user;
        }
      }
      throw new Error(`Password not correct for user: ${user.email}`);
    } catch (err) {
      console.log(`Unsuccessfull login: ${err}`);
      return false;
    }
  }

  static async _validateAzure(credentials: {token: string} ) {
    return new Promise((resolve, reject) => {
      azureJWT.verify(credentials.token, { }, async function (err: any, userFromToken: any) {
        if (err) {
          return reject(err);
        }

        try {
          const foundUser = await User.getByEmail(userFromToken.unique_name);
          if (foundUser) {
            return resolve(foundUser);
          } else {
            await User.createUser({
              email: userFromToken.unique_name,
              firstName: userFromToken.given_name,
              lastName: userFromToken.family_name,
            });
            const newUser = await User.getByEmail(userFromToken.unique_name);
            return resolve(newUser);
          }
        } catch (err) {
          return reject(err);
        }
      });
    });

  }

}

export default Auth;
