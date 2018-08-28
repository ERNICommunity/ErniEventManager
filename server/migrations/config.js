'use strict';
require('dotenv').config();
// In this file you can configure migrate-mongo

module.exports = {

  mongodb: {

    // TODO Change (or review) the url to your MongoDB:
    url: process.env.MONGO_SERVER,

    // TODO Change this to your database name:
    databaseName: process.env.MONGO_DATABASE,

    options: {
      useNewUrlParser: true // removes a deprecation warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations/scripts',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog'

};