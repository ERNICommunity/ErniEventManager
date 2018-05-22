import { Router } from "express";

export interface IRouter extends Router {
    [key: string]: any
}

export interface RouteParameters {
    method: string,
    route: string,
    fn: string
}