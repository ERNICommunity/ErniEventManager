import * as httpMocks from 'node-mocks-http';
import * as express from 'express';
import {default as GeneralRouter} from './general-router';
import {Response, Request, NextFunction} from 'express';

const controllerMock = {
    method: (params: any) => params,
    methodUndefined: (params: any) => undefined,
    methodNull: (params: any) => Promise.resolve(null),
    methodEmpty: (params: any) => Promise.resolve([]),
    methodError: (params: any) => {throw new Error('Some error!')},
    methodErrorResponse: (params: any) => Promise.resolve(new Error('Some error!')),
    methodObject: (params: any) => Promise.resolve({field: 'value'}),
    methodArray: (params: any) => Promise.resolve([{field: 'value'}])
};

const mockPost = jest.fn();
const mockGet = jest.fn();
const mockDelete = jest.fn();
const mockHead = jest.fn();
const mockPut = jest.fn();

jest.mock('express', () => {
    return {
        Router: function () {
            return {
                post: mockPost,
                get: mockGet,
                delete: mockDelete,
                head: mockHead,
                put: mockPut
            };
        }
    };
});

describe('General Router', () => {
    describe('constructor', () => {
        afterEach(() => {
            if (typeof GeneralRouter.prototype.createRoute.restore === 'function') {
                GeneralRouter.prototype.createRoute.restore();
            }
        });

        it('should set controller according to the parameter', () => {
            const router = new GeneralRouter([], controllerMock);
            expect(router.controller).toEqual(controllerMock);
        });

        it('should create route according to configuration', () => {
            const routes = [
                {method: 'get', route: '/route1', fn: 'route1Ctrl'},
                {method: 'post', route: '/route2', fn: 'route2Ctrl'},
                {method: 'put', route: '/route3', fn: 'route3Ctrl'}
            ];
            const createRouteSpy = jest.spyOn(GeneralRouter.prototype, 'createRoute');
            const router = new GeneralRouter(routes, controllerMock);
            routes.forEach(route => {
                expect(createRouteSpy).toBeCalledWith(route);
            });
        });
    });

    describe('createRoute()', () => {
        it('should reject unknown method', () => {
            const route = {method: 'unknown', route: '/unknown', fn: 'unknown'};
            try {
                GeneralRouter.prototype.createRoute(route);
                throw new Error('Should throw error');
            } catch (err) {
                expect(err.message).toEqual('Method not recognized.');
            }
        });

        it('should register all routes to router', () => {
            const router = new GeneralRouter([], controllerMock);
            router.middlewareFactory = jest.fn().mockImplementation((handler, fn) => `${handler()} + ${fn}`);
            router.handleRoute = jest.fn().mockImplementation(() => 'handleRoute');

            // GET Route
            router.createRoute({method: 'get', route: '/route1', fn: 'route1Ctrl'});
            expect(mockGet).toBeCalledWith('/route1', 'handleRoute + route1Ctrl');

            // POST Route
            router.createRoute({method: 'post', route: '/route2', fn: 'route2Ctrl'});
            expect(mockPost).toBeCalledWith('/route2', 'handleRoute + route2Ctrl');

            // PUT Route
            router.createRoute({method: 'put', route: '/route3', fn: 'route3Ctrl'});
            expect(mockPut).toBeCalledWith('/route3', 'handleRoute + route3Ctrl');

            // HEAD Route
            router.createRoute({method: 'head', route: '/route4', fn: 'route4Ctrl'});
            expect(mockHead).toBeCalledWith('/route4', 'handleRoute + route4Ctrl');

            // DELETE Route
            router.createRoute({method: 'delete', route: '/route5', fn: 'route5Ctrl'});
            expect(mockDelete).toBeCalledWith('/route5', 'handleRoute + route5Ctrl');
        });

        it('should understand upper cased method', () => {
            const router = new GeneralRouter([], controllerMock);
            router.middlewareFactory = jest.fn().mockImplementation((handler, fn) => `${handler()} + ${fn}`);
            router.handleRoute = jest.fn().mockImplementation(() => 'handleRoute');

            router.createRoute({method: 'GET', route: '/route6', fn: 'route6Ctrl'});
            expect(mockGet).toBeCalledWith('/route6', 'handleRoute + route6Ctrl');
        });
    });

    describe('middlewareFactory()', () => {
        it('should return middleware that returns handler with correct arguments', () => {
            const router = new GeneralRouter([], controllerMock);
            const handler = (req: Request, res: Response, rtr: any, fn: string): any => {
                return {
                    req: req,
                    res: res,
                    rtr: rtr,
                    fn: fn
                };
            };
            const fn = 'fnMock';

            const middleware = router.middlewareFactory(handler, fn);

            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = () => {
            };

            const response = middleware(req, res, next);
            expect(response).toEqual({
                req: req,
                res: res,
                rtr: router,
                fn: fn
            });
        });
    });

    describe('getParams()', () => {
        it('should collect data from req', () => {
            const req = httpMocks.createRequest();
            req.body = {
                param1: 'value1'
            };
            req.query = {
                param2: 'value2'
            };
            req.params = {
                param3: 'value3'
            };

            const result = GeneralRouter.prototype.getParams(req);

            expect(result).toEqual({
                param1: 'value1',
                param2: 'value2',
                param3: 'value3'
            });
        });
    });
    describe('middlewareFactory()', () => {
        it('should response error if requested method is not a function in controller', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'unknown');
            expect(res._getStatusCode()).toEqual(500);
            expect(res._getData()).toEqual(JSON.stringify({error: 'Unknown method: unknown'}));
        });

        it('should response error if requested method throws error', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodError');
            expect(res._getStatusCode()).toEqual(500);
            expect(res._getData()).toEqual(JSON.stringify({error: 'Some error!'}));
        });

        it('should response error if requested method returns error', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodErrorResponse');
            expect(res._getStatusCode()).toEqual(500);
            expect(res._getData()).toEqual(JSON.stringify({error: 'Some error!'}));
        });

        it('should response 404 not found if method does not return undefined', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodUndefined');
            expect(res._getStatusCode()).toEqual(404);
            expect(res._getData()).toEqual(JSON.stringify({error: 'Not found.'}));
        });

        it('should response 404 not found if method does not return null', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodNull');
            expect(res._getStatusCode()).toEqual(404);
            expect(res._getData()).toEqual(JSON.stringify({error: 'Not found.'}));
        });

        it('should response 404 not found if method does not return empty array', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodEmpty');
            expect(res._getStatusCode()).toEqual(404);
            expect(res._getData()).toEqual(JSON.stringify({error: 'Not found.'}));
        });

        it('should response 200 with results if method returns object', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodObject');
            expect(res._getStatusCode()).toEqual(200);
            expect(res._getData()).toEqual(JSON.stringify({field: 'value'}));
        });

        it('should response 200 with results if method returns array', async () => {
            const router = new GeneralRouter([], controllerMock);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await router.handleRoute(req, res, router, 'methodArray');
            expect(res._getStatusCode()).toEqual(200);
            expect(res._getData()).toEqual(JSON.stringify([{field: 'value'}]));
        });
    });
});
