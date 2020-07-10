module.exports = {
  createUser: async function (req, res, db) {
    const userId = req.body['id'];
    const idDuplication = await isIdDuplicated(db, userId);
    if (idDuplication) {
      res.json({ success: 0 });
      console.log('아이디 중복');
      return;
    }
    const encryptedPasswordAndSalt = await getEncryptedPasswordAndSalt(req.body['password']);
    const user = {
      id: userId,
      password: encryptedPasswordAndSalt.encryptedPassword,
      emailId: req.body['email-id'],
      emailSite: req.body['email-site'],
      name: req.body['name'],
      phone: req.body['phone'],
      zipCode: req.body['zipcode'],
      address: req.body['address'],
      addressDetail: req.body['address-detail'],
      isOptionalTermChecked: req.body['option-terms'],
      salt: encryptedPasswordAndSalt.salt,
    };
    db.insert(user, function (err) {
      res.render('sign-up-complete.pug', {
        name: user.name,
        id: user.id,
        email: `${user.emailId}@${user.emailSite}`,
        phone: user.phone,
      });
      console.log('저장 완료');
    });
  },
  validateUser: async function (req, res, db) {
    const sess = req.session;
    const userId = req.body['id'];
    const userPassword = req.body['password'];
    const idExistence = await hasId(db, userId);
    if (!idExistence) {
      res.render('login.pug', { error: '존재하지 않는 아이디입니다.' });
      console.log('아이디 없음');
      return;
    }
    const userSalt = await getSalt(db, userId);
    const encryptedPassword = await getEncryptedPasswordWithSalt(userPassword, userSalt);
    const logInSuccess = await processLogIn(db, userId, encryptedPassword);
    if (logInSuccess) {
      sess.userId = userId;
      res.redirect('/');
      console.log('로그인 성공');
    } else {
      res.render('login.pug', { error: '아이디와 비밀번호를 확인 후 다시 로그인해주세요.' });
      console.log('패스워드 불일치');
    }
  },
  checkIdDuplication: async function (req, res, db) {
    const userId = req.body.userId;
    const idDuplication = await isIdDuplicated(db, userId);
    res.json({ idDuplication: idDuplication });
  },
};

/**
 * 평문 비밀번호를 암호화하고 암호화된 비밀번호와 솔트 값을 리턴
 * @param {string} password
 * @returns {Promise<{encryptedPassword : string, salt : string}>} promise
 */
function getEncryptedPasswordAndSalt(password) {
  const crypto = require('crypto');
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // 64바이트 랜덤 salt 생성
      crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        // base64방식으로 표현, 10만번 반복, sha512 알고리즘 사용,
        resolve({ encryptedPassword: key.toString('base64'), salt: buf.toString('base64') });
      });
    });
  });
}

/**
 * 평문 비밀번호를 솔트 값으로 암호화하고 암호화된 비밀번호를 리턴
 * @param {string} password
 * @param {string} salt
 * @returns {Promise<string>} encryptedPassword  promise
 */
function getEncryptedPasswordWithSalt(password, salt) {
  const crypto = require('crypto');
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // 64바이트 랜덤 salt 생성
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
        // base64방식으로 표현, 10만번 반복, sha512 알고리즘 사용,
        resolve(key.toString('base64'));
      });
    });
  });
}

/**
 * 아이디 중복을 확인
 * @param {Nedb} db
 * @param {string} id
 * @returns {Promise<boolean>} 중복된 아이디면 true, 아니면 false 반환
 */
function isIdDuplicated(db, id) {
  return new Promise((resolve, reject) => {
    db.find({ id: id }, function (err, docs) {
      if (docs.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * 아이디 존재를 확인
 * @param {Nedb} db
 * @param {string} id
 * @returns {Promise<boolean>} 존재하는 아이디면 true, 아니면 false 반환
 */
function hasId(db, id) {
  return new Promise((resolve, reject) => {
    db.find({ id: id }, function (err, docs) {
      if (docs.length !== 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * 유저의 솔트 값 리턴
 * @param {Nedb} db
 * @param {string} id
 * @returns {Promise<string>} salt 유저의 고유 salt값
 */
function getSalt(db, id) {
  return new Promise((resolve, reject) => {
    db.find({ id: id }, function (err, docs) {
      resolve(docs[0].salt);
    });
  });
}

/**
 * 로그인 결과를 리턴
 * @param {Nedb} db
 * @param {string} id
 * @param {string} pw
 * @returns {Promise<Boolean>} 로그인 결과 값
 */
function processLogIn(db, id, pw) {
  return new Promise((resolve, reject) => {
    db.find({ id: id }, function (err, docs) {
      if (pw === docs[0].password) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
