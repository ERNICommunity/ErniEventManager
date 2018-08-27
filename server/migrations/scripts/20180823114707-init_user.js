'use strict';

module.exports = {

  up(db, next) {
    db.collection('users').insert({
        "email": "admin@erni.ch",
        "firstName": "Admin",
        "lastName": "User",
        "type": "admin",
        "role": "admin"
    });
    next();
  },

  down(db, next) {
    db.collection('users').remove({"email": "admin@erni.ch"});
    next();
  }

};