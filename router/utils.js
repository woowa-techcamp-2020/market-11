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
      emailId: req.body['emailId'],
      emailSite: req.body['emailSite'],
      name: req.body['name'],
      phone: req.body['phone'],
      zipCode: req.body['zipCode'],
      address: req.body['address'],
      addressDetail: req.body['addressDetail'],
      isOptionalTermChecked: req.body['optionalTermChecked'],
      salt: encryptedPasswordAndSalt.salt,
    };
    db.insert(user, function (err) {
      const result = { success: 1 };
      res.json(result);
      console.log('저장 완료');
    });
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
