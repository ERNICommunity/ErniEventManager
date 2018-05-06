import * as express from 'express';
import { Router } from "express";
const eventController = require('./event.controller');

class EventRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.get('/:id', eventController.get);
        this.router.post('/create', eventController.create);
        this.router.post('/filters', eventController.queryPaginated);
        this.router.put('/update', eventController.update);
        this.router.post('/delete', eventController.delete);
    }

}

module.exports = new EventRoute().router;