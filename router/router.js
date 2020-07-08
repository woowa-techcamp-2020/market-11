const utils = require('./utils');

module.exports = function (app, db) {
  app.get('/sign-up', function (req, res) {
    res.render('sign-up.html');
  });

  app.get('/sign-up-complete', function (req, res) {
    res.render('sign-up-complete.html');
  });

  app.post('/add-user', function (req, res) {
    utils.createUser(req, res);
  });
};
