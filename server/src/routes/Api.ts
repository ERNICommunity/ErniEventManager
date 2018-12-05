import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import {default as Auth} from './../middleware/auth';

const eventRouter = require('../models/event');
const subEventRouter = require('../models/subEvent');
const userRouter = require('../models/user');

class ApiRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.use('*', Auth.allowOptions);
        this.router.post('/login', Auth.login);
        this.router.use('/subEvent', Auth.authorize, subEventRouter);
        this.router.use('/event', Auth.authorize, eventRouter);
        this.router.use('/user', Auth.authorize, Auth.requireAdmin, userRouter);
        this.router.get('/', Auth.authorize, this.getEmpty);
        this.router.get('/:params', Auth.authorize, this.getParams);
    }

    getEmpty(req: Request, res: Response, next: NextFunction) {
        res.send('API is working');
    }

    getParams(req: Request, res: Response, next: NextFunction) {
        const params = req.params;
        const query = req.query;
        Object.assign(params, query);
        res.json(params);
    }
}

module.exports = new ApiRoute().router;
