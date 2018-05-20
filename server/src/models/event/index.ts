import * as express from 'express';
import { Router } from "express";
import { Model } from "mongoose";
const eventController = require('./event.controller');
import { default as GeneralRouter } from "../../utils/router-utils";
import { default as EventModel } from "./event.model";
import { Response, Request, NextFunction } from "express";

class EventRouter extends GeneralRouter {
    constructor(model: Model<any>) {
        super(model);
    }

    async getParticipants(params: any) {
        let event = await this.model.findById(params.id)
        return event ? event.participants: null;
    }
}

let eventRouter  = new EventRouter(EventModel);

eventRouter.router.get('/:id/participants', (req: Request, res: Response, next?: NextFunction) => {
    return eventRouter.handleRoute(req, res, 'getParticipants', true);
});

module.exports = eventRouter.router;