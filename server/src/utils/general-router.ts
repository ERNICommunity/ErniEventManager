import * as express from 'express';
import { IRouter, IRouteParameters, IRequest } from '../interfaces';
import { Response, NextFunction } from 'express';

/**
 * GeneralRouter handles registering routes to express router based on given configuration
 */

class GeneralRouter {
    public router: IRouter;
    public controller: any;

    /**
     * Calls route registration process for each route
     * @param routes {Array<IRouteParameters>} array of routes
     * @param controller {object} object that contains implementation of functions, that should be called on routes
     */
    constructor(routes: Array<IRouteParameters>, controller: any) {
        this.router = express.Router();
        this.controller = controller;

        routes.forEach(route => {
            this.createRoute(route);
        });
    }

    /**
     * Register route to express router
     * @param route {IRouteParameters} route to register
     */
    createRoute(route: IRouteParameters) {
        route.method = route.method.toLowerCase();
        if (['get', 'post', 'put', 'delete', 'head'].indexOf(route.method) === -1) {
            throw new Error('Method not recognized.');
        }

        this.router[route.method](
            route.route,
            this.middlewareFactory(this.handleRoute, route.fn)
        );
    }

    /**
     * Returns middleware that calls handler with req, res, router and function to call
     * @param handler {(req: Request, res: Response, router: any, fn: string) => any} function that handles calling function
     * @param fn {string} name of funcion to be called
     * @returns {(req: Request, res: Response, next?: NextFunction) => any} middleware that can be sent to router
     */
    middlewareFactory(handler: (req: IRequest, res: Response, router: any, fn: string) => any, fn: string) {
        return (req: IRequest, res: Response, next?: NextFunction) => handler(req, res, this, fn);
    }

    /**
     * Groups all parameters (from param, query, body) to one object
     * @param {Request} req
     * @returns {{} & any & any & any}
     */
    getParams(req: IRequest) {
        const params = req.params;
        const query = req.query;
        const body = req.body;
        const user = {user: req.user};
        return Object.assign({}, params, query, body, user);
    }

    async handleRoute(req: IRequest, res: Response, router: any, fn: string) {
        let result;
        try {
            if (typeof router.controller[fn] !== 'function') {
                throw new Error(`Unknown method: ${fn}`);
            }

            result = await router.controller[fn](router.getParams(req));
        } catch (err) {
            if (err instanceof Error) {
                err = err.message;
            }
            return res.status(500).json({error: err});
        }

        if (result instanceof Error) {
            return res.status(500).json({error: result.message});
        } else if (result === undefined || result === null || (Array.isArray(result) && !result.length)) {
            return res.status(404).json({error: 'Not found.'});
        } else {
            return res.status(200).json(result);
        }
    }
}

export default GeneralRouter;
