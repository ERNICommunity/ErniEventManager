# Server

Application to handle Erni events - backend part

## Prerequisites

node -> 10.1.0

## Setup

To install:
 * Create a .env file based on .env-example and fill it with development data
 * Run `npm install` from root server directory.
 * Add SSH private key to /key/private.key for authorization

To run locally:
 * Setup & make sure you have mongo running.
 * Run `npm run watch`, wait until webpack builds & runs the Nodejs app
 * When you see "[watch:server] server is listening on 3000" message, the application server is running & will automatically reload if you change any of the source file.

To run on server:
TBD

## Debug 
 In VS Code, Open the Debug tab & launch the `Attach to ts project`.

## Testing

Testing is done with jest framework: https://jestjs.io/

Configuration of jest can be found in `jest.config.json`. Framework can do mocking, stubbing and asserting without other external plugin.

Debugging in tests: TBD

Tests can be run by `npm test`

Test files are in the same folder as implementation js file with name `*-test.ts`

Test packages:

mockingoose: https://www.npmjs.com/package/mockingoose - used for creating mocking mongo model