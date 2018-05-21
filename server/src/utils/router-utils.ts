import * as express from 'express';
import { Router } from "express";
import { Schema, Model } from "mongoose";
import { Response, Request, NextFunction } from "express";

interface GeneralRouter {
    router: Router,
    model: Model<any>,
    controller: any,
    [propName: string]: Function
}

class GeneralRouter {
    public router: Router;
    public model: Model<any>;

    constructor(Model: Model<any>, Controller: any) {
        this.router = express.Router();
        this.model = Model;
        this.controller = Controller;

        this.router.get('/', async (req: Request, res: Response, next?: NextFunction) => this.handleRoute(req, res, 'getAll', true));
        this.router.get('/:id', async (req: Request, res: Response, next?: NextFunction) => this.handleRoute(req, res, 'get', false));
        this.router.post('/', async (req: Request, res: Response, next?: NextFunction) => this.handleRoute(req, res, 'create', false));
        this.router.put('/:id', async (req: Request, res: Response, next?: NextFunction) => this.handleRoute(req, res, 'update', false));
        this.router.delete('/:id', async (req: Request, res: Response, next?: NextFunction) => this.handleRoute(req, res, 'delete', false));

    }
    
    async getAll(params: Object) {
        let result = await this.model.find({}).exec();
        return result;
    }

    getParams(req: Request) {
        const params = req.params;
        const query = req.query;
        const body = req.body; 
        return Object.assign({}, params, query, body);
    }

    async handleRoute(req: Request, res: Response, method: string, array: boolean) {
        let result;
        try {
            if(typeof this.controller[method] !== 'function') {
                throw new Error(`Unknown method: ${method}`);
            }
            
            result = await this.controller[method](this.getParams(req));
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