import * as express from 'express';
const eventController = require('./event.controller');

class EventRoute {
    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.get('/:id', eventController.get);
        this.router.post('', eventController.create);
        this.router.get('', eventController.queryPaginated);
        this.router.put('/:id', eventController.update);
        this.router.delete('/:id', eventController.delete);
    }

}

module.exports = new EventRoute().router;
