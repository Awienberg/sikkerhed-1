var express = require('express');
var router = express.Router();
const userHandler = require("../models/handleUsers");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Register
router.get('/register', function(req, res) {  // display register route
  res.render('register', {                    // display register form view
      title: 'Register User'                  // input data to view
  });
});
router.post('/register', function(req, res) { // new user post route
  userHandler.upsertUser(req);
  return res.redirect('/');                   // skip the receipt, return to fp
});
//Login
router.get('/login', function(req, res) {     // display register route
  res.render('login', {                       // display register form view
      title: 'User Login'                     // input data to view
  });
});
router.post('/login', async function(req, res) {  // new user post route
  let rc = await userHandler.verifyUser(req);     // verify credentials
  if (rc) {
      res.render('index', {                   // find the view 'index'
          title: 'Map of the World',          // input data to 'index'
          loggedin: true,
          who: req.session.user               // using session var(s)
      });
  } else {
      res.render('login', {                   // find the view 'login'
          title: 'User Login',                // input data to 'login'
          loggedin: false
      });
  }
});

module.exports = router;
