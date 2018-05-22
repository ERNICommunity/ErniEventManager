import * as express from 'express';
import { IRouter, RouteParameters } from '../interfaces';
import { Schema, Model } from "mongoose";
import { Response, Request, NextFunction } from "express";

interface GeneralRouter {
    router: IRouter,
    controller: any,
    [propName: string]: Function
}

class GeneralRouter {
    public router: IRouter;
    public controller: any;

    constructor(options: Array<RouteParameters>, Controller: any) {
        this.router = express.Router();
        this.controller = Controller;

        options.forEach(route => {
            this.createRoute(route)
        });
    }
    
    createRoute(params: RouteParameters) {
        params.method = params.method.toLowerCase();
        if(['get', 'post', 'put', 'delete', 'head'].indexOf(params.method) === -1) {
            throw new Error('Method not recognized.');
        }

        this.router[params.method](
            params.route, 
            this.middlewareFactory(this.handleRoute, params.fn)
        )
    }

    middlewareFactory(handler: (req: Request, res: Response, router: any, fn: string) => any, fn: string) {
        return (req: Request, res: Response, next?: NextFunction) => handler(req, res, this, fn)
    }

    getParams(req: Request) {
        const params = req.params;
        const query = req.query;
        const body = req.body; 
        return Object.assign({}, params, query, body);
    }

    async handleRoute(req: Request, res: Response, router: any, fn: string) {
        let result;
        try {
            if(typeof router.controller[fn] !== 'function') {
                throw new Error(`Unknown method: ${fn}`);
            }
            
            result = await router.controller[fn](router.getParams(req));
        }
        catch(err) {
            return res.status(500).json({error: err.message});
        }

        if(result instanceof Error) {
            return res.status(500).json({error: result.message});
        } else if(!result || (Array.isArray(result) && !result.length)) {
            return res.status(404).json({error: 'Not found.'});
        } else {
            return res.status(200).json(result);
        }
    }
}

export default GeneralRouter;