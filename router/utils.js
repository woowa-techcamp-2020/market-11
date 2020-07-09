module.exports = {
  createUser: async function (req, res, db) {
    const user = {
      id: req.body['id'],
      password: req.body['password'],
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
  },
};

/**
 * 평문 비밀번호를 암호화하고 암호화된 비밀번호와 솔트 값을 리턴
 * @param {string} password 
 * @returns {{string, string}} {encryptedPassword, salt}
 */
function getEncryptedPasswordAndSalt(password){
  const crypto = require('crypto');
  return new Promise((resolve, reject)=>{
    crypto.randomBytes(64, (err, buf) => { // 64바이트 랜덤 salt 생성
      crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => { // base64방식으로 표현, 10만번 반복, sha512 알고리즘 사용,
        resolve({encryptedPassword : key.toString('base64'), salt : buf.toString('base64')});
      });
    });
  });
}
