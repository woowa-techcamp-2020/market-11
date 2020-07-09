const utils = require('./utils');

module.exports = function (app, db) {
  app.get('/sign-up', function (req, res) {
    res.render('sign-up.pug');
  });

  app.get('/sign-up-complete', function (req, res) {
    res.render('sign-up-complete.pug');
  });

  app.post('/add-user', function (req, res) {
    utils.createUser(req, res, db);
  });
};
