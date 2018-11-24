'use strict';
const bcrypt = require('bcrypt');

module.exports = {

  up(db, next) {
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync("admin", salt);
      db.collection('users').update({email: "admin@erni.ch"}, {$set: {password: pass}});
        next();
  },

  down(db, next) {
    next();
  }

};