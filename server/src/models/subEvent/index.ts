import { IRouteParameters } from '../../interfaces';
import { default as GeneralRouter } from '../../utils/general-router';

const subEventController = require('./subEvent.controller');

const config: Array<IRouteParameters> = [
    {route: '/', method: 'get', fn: 'getAll'},
    {route: '/:id', method: 'get', fn: 'get'},
    {route: '/', method: 'post', fn: 'create'},
    {route: '/:id', method: 'put', fn: 'update'},
    {route: '/:id', method: 'delete', fn: 'delete'},
];

const subEventRouter  = new GeneralRouter(config, subEventController);

module.exports = subEventRouter.router;
