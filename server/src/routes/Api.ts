import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
const eventRouter = require('../models/event');
const userRouter = require('../models/user');
const authMiddleware = require('../middleware/auth');

class ApiRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.use('*', authMiddleware.allowOptions);
        this.router.post('/login', authMiddleware.login);
        this.router.use('/event', authMiddleware.authorize, eventRouter);
        this.router.use('/user', authMiddleware.authorize, userRouter);
        this.router.get('/', authMiddleware.authorize, this.getEmpty);
        this.router.get('/:params', authMiddleware.authorize, this.getParams);
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
