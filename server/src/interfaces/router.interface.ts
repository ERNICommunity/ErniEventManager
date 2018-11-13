import { Router, Request } from 'express';

export interface IRouter extends Router {
    [key: string]: any;
}

export interface IRouteParameters {
    method: string;
    route: string;
    fn: string;
}

export interface IRequest extends Request {
  user: any;
}
