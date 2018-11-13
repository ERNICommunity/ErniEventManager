import * as httpMocks from 'node-mocks-http';
import {default as Auth} from './../middleware/auth';

jest.mock('jsonwebtoken', () => {
  return {
    sign: (payload, key) => JSON.stringify(payload),
    verify: (token, key) => {
      if (token === '1') {
        return Promise.resolve(token);
      } else {
        return Promise.reject();
      }
    }
  };
});

describe('Auth', () => {
  describe('login', () => {
    it('should return unauthorized access if validation does not return user', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      Auth._validateEmailAndPassword = jest.fn().mockReturnValueOnce(undefined);
      await Auth.login(req, res);
      expect(res._getStatusCode()).toEqual(401);
      expect(res._getData()).toEqual('Incorrect credentials');
    });

    it('should return token and user data after validation of user and password', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      req.body.login = 'login';
      req.body.password = 'password';

      Auth._validateEmailAndPassword = jest.fn().mockReturnValueOnce({
        id: 123,
        email: 'test@test.sk',
        firstName: 'Test',
        lastName: 'User',
      });
      await Auth.login(req, res);
      expect(res._getStatusCode()).toEqual(200);
      expect(res._getData()).toEqual(JSON.stringify({
        id: 123,
        email: 'test@test.sk',
        firstName: 'Test',
        lastName: 'User',
        token: JSON.stringify({ id: 123 })
      }));
    });
  });
  it('should return token and user data after validation of azure token', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      req.body.token = 'token';

      Auth._validateAzure = jest.fn().mockReturnValueOnce({
        id: 123,
        email: 'test@test.sk',
        firstName: 'Test',
        lastName: 'User',
      });
      await Auth.login(req, res);
      expect(res._getStatusCode()).toEqual(200);
      expect(res._getData()).toEqual(JSON.stringify({
        id: 123,
        email: 'test@test.sk',
        firstName: 'Test',
        lastName: 'User',
        token: JSON.stringify({ id: 123 })
      }));
    });
  });
  describe('authorize', () => {
    it('it should call next middleware if token is verified', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      req.headers.authorization = 'Bearer 1';
      await Auth.authorize(req, res, next);
      expect(next).toBeCalled();
    });
    it('it should return 401 if token is not valid', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      req.headers.authorization = 'Bearer 0';
      await Auth.authorize(req, res, next);
      expect(res._getStatusCode()).toEqual(401);
      expect(res._getData()).toEqual('Unauthorized access');
    });
    it('it should return 401 if authorization is not set', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      await Auth.authorize(req, res, next);
      expect(res._getStatusCode()).toEqual(401);
      expect(res._getData()).toEqual('Unauthorized access');
    });
  });
  describe('allowOptions', () => {
    it('should allow OPTION request', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      req.method = 'OPTIONS';

      Auth.allowOptions(req, res, next);
      expect(res._getStatusCode()).toEqual(200);
      expect(res._getData()).toEqual('');
    });

    it('should call next function if method is not OPTION', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();
      req.method = 'GET';

      Auth.allowOptions(req, res, next);
      expect(next).toBeCalled();
    });
  });
});
