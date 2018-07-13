import { IRouteParameters } from '../../interfaces';
const userController = require('./user.controller');
import { default as GeneralRouter } from '../../utils/general-router';

const config: Array<IRouteParameters> = [
    {route: '/', method: 'get', fn: 'getAll'},
    {route: '/:id', method: 'get', fn: 'get'},
    {route: '/', method: 'post', fn: 'create'},
    {route: '/:id', method: 'put', fn: 'update'},
    {route: '/:id', method: 'delete', fn: 'delete'},
];

const userRouter  = new GeneralRouter(config, userController);

module.exports = userRouter.router;
