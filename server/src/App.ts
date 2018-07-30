import * as express from 'express';
// import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as path from 'path';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';

import {Request, Response, NextFunction, Application} from 'express';
import {SessionOptions} from 'express-session';

const env: string = process.env.NODE_ENV || 'local';
const secret: string = process.env.cookieSecret || 'erni_secret';

const cookieParser = require('cookie-parser');

const request = require('request-promise');

const favicon = require('serve-favicon');

const api = require('./routes/api');

const isProduction = env === 'production';
const isLocal = env === 'local';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.enableLogging();
    this.setupParsing();
    this.setupCookies(isProduction);
    this.enableStaticFiles();
    this.mountRoutes();
  }

  private enableLogging(): void {
    this.app.use(logger('dev'));
  }

  private setupParsing(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  private setupCookies(inProdMode: boolean): void {
    this.app.use(cookieParser(process.env.cookieSecret));
    // ADd more cookie handling from page 309
  }

  private enableStaticFiles(): void {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private mountRoutes(): void {
    console.log('isProduction: ', isProduction);
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      if (!isProduction) {
        const allowedHeaders = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Origin', 'Authorization'];

        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      }
      next();
    });

    this.app.use('/api', api);
    this.app.use(function (req: Request, res: Response) {
      const error: Error = new Error('Not Found');
      res.status(404).json({
        status: 404,
        message: error.message,
        name: error.name
      });
    });
  }
}

export default new App().app;
