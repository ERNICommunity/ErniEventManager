import * as express from 'express';
import { Router } from 'express';
import { Model } from 'mongoose';
import { IRouter, IRouteParameters } from '../../interfaces';
const eventController = require('./event.controller');
import { default as GeneralRouter } from '../../utils/general-router';
import { default as EventModel } from './event.model';
import { Response, Request, NextFunction } from 'express';

const config: Array<IRouteParameters> = [
    {route: '/', method: 'get', fn: 'getAll'},
    {route: '/:id', method: 'get', fn: 'get'},
    {route: '/', method: 'post', fn: 'create'},
    {route: '/:id', method: 'put', fn: 'update'},
    {route: '/:id', method: 'delete', fn: 'delete'},
];

const eventRouter  = new GeneralRouter(config, eventController);

module.exports = eventRouter.router;
