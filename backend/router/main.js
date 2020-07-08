module.exports = function (app, fs) {
  app.get('/', function (req, res) {
    res.render('sign-up.html');
  });

  app.get('/sign-up', function (req, res) {
    res.render('sign-up.html');
  });
};
