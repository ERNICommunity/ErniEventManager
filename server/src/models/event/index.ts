import * as express from 'express';
import { Router } from "express";
import { Model } from "mongoose";
const eventController = require('./event.controller');
import { default as GeneralRouter } from "../../utils/router-utils";
import { default as EventModel } from "./event.model";
import { Response, Request, NextFunction } from "express";

let eventRouter  = new GeneralRouter(EventModel, eventController);

eventRouter.router.get('/:id/participants', (req: Request, res: Response, next?: NextFunction) => {
    return eventRouter.handleRoute(req, res, 'getParticipants', true);
});

module.exports = eventRouter.router;