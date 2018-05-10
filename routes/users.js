const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas } = require ('../helpers/routeHelpers');
const UserController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');

const passportSignIn = passport.authenticate('local', {session: false});
const passportJwt = passport.authenticate('jwt', {session: false});

router.route('/signup')
//Email and Password;
   .post(validateBody(schemas.userSchema), UserController.signup);

 router.route('/signin')
 // Genarate a token;
    .post(validateBody(schemas.userSchema), passportSignIn , UserController.signin);
 
 router.route('/secret')
    .get(passportJwt, UserController.secret);

  module.exports = router;
