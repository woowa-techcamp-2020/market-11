module.exports = function (app, fs, db) {
  app.get('/sign-up', function (req, res) {
    res.render('sign-up.html');
  });

  app.get('/sign-up-complete', function (req, res) {
    res.render('sign-up-complete.html');
  });

  app.post('/add-user', function (req, res) {
    const user = {
      id: req.body['id'],
      password: req.body['password'],
      passwordCheck: req.body['passwordCheck'],
      emailId: req.body['emailId'],
      emailSite: req.body['emailSite'],
      name: req.body['name'],
      phone: req.body['phone'],
      zipCode: req.body['zipCode'],
      address: req.body['address'],
      addressDetail: req.body['addressDetail'],
      isOptionalTermChecked: req.body['optionalTermChecked'],
    };
    db.insert(user, function (err) {
      const result = { success: 1 };
      res.json(result);
      console.log('저장 완료');
    });
  });
};
