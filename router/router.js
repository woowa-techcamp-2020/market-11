const utils = require('./utils');

module.exports = function (app, db) {
  app.get('/', function (req, res) {
    res.render('main.pug');
  });

  app.get('/sign-up', function (req, res) {
    res.render('sign-up.pug');
  });

  app.get('/login', function (req, res) {
    res.render('login.pug');
  });

  app.get('/sign-up-complete', function (req, res) {
    res.render('sign-up-complete.pug');
  });

  app.post('/add-user', function (req, res) {
    utils.createUser(req, res, db);
  });
};
