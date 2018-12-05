import { IRouteParameters } from '../../interfaces';
const eventController = require('./event.controller');
import { default as GeneralRouter } from '../../utils/general-router';

const config: Array<IRouteParameters> = [
    {route: '/', method: 'get', fn: 'getAll'},
    {route: '/joined/', method: 'get', fn: 'getJoined'},
    {route: '/:id', method: 'get', fn: 'get'},
    {route: '/', method: 'post', fn: 'create'},
    {route: '/:id', method: 'put', fn: 'update'},
    {route: '/:id', method: 'delete', fn: 'delete'},
    {route: '/join/:id', method: 'get', fn: 'join'},
    {route: '/leave/:id', method: 'get', fn: 'leave'},
];

const eventRouter  = new GeneralRouter(config, eventController);

module.exports = eventRouter.router;
