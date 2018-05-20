import * as express from 'express';
import { Router } from "express";
import { Schema, Model } from "mongoose";
import { Response, Request, NextFunction } from "express";

interface GeneralRouter {
    router: Router,
    model: Model<any>,
    [propName: string]: Function
}

class GeneralRouter {
    public router: Router;
    public model: Model<any>;

    constructor(Model: Model<any>) {
        this.router = express.Router();
        this.model = Model;

        this.router.get('/', async (req: Request, res: Response, next?: NextFunction) => this.handleRoute(req, res, 'getAll', true));
        //this.router.post('/', this.create(Model));
        //this.router.get('/:id', this.get(Model));
        //this.router.post('/:id', this.update(Model));

    }
    async getAll(params: Object) {
        try{
            let result = await this.model.find({}).exec();
            return result;
        }
        catch(err) {
            return err;
        }
    }

    getParams(req: Request) {
        const params = req.params;
        const query = req.query;
        Object.assign(params, query);
        return params;
    }

    async handleRoute(req: Request, res: Response, method: string, array: boolean) {
        let result;
        try {
             result = await this[method](this.getParams, req)
        }
        catch(err) {
            return res.status(500).json({error: err.message});
        }

        if(result instanceof Error) {
            return res.status(500).json({error: result.message});
        } else if(!result || (array && !result.length)) {
            return res.status(404).json({error: 'Not found.'});
        } else {
            return res.status(200).json(result);
        }
    }
}

export default GeneralRouter;