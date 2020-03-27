const crypto = require('crypto');

function makeSalt(byteSize) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteSize || 16, function(err, salt) {
      if(err) {
        return reject(err);
      }
      return resolve(salt.toString('base64'));
    });
  });
}

function initializeVector(stringLength) {
  return new Promise((resolve, reject) => {
    makeSalt()
      .then(iv => resolve(iv.slice(0, stringLength || 16)))
      .catch(reject);
  });
}

function encryptPassword(password, saltString) {
  return new Promise((resolve, reject) => {
    if(!password || !saltString) {
      resolve();
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(saltString, 'base64');

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256',
      function(err, key) {
        if(err) {
          return reject(err);
        }
        return resolve(key.toString('base64'));
      });
  });
}


function cipherEncrypt(plaintext, iv, secret) {
  return new Promise(resolve => {
    const cipher = crypto.createCipheriv(
      'aes-128-cbc',
      secret.slice(0, 16),
      iv
    );
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return resolve(encrypted.toString('base64'));
  });
}

function cipherDecrypt(encryptedValue, iv, secret) {
  return new Promise(resolve => {
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      secret.slice(0, 16),
      iv
    );
    let decrypted = decipher.update(encryptedValue, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return resolve(decrypted);
  });
}

/* eslint-disable object-shorthand */
module.exports = {
  makeSalt: makeSalt,
  initializeVector: initializeVector,
  encryptPassword: encryptPassword,
  cipherEncrypt: cipherEncrypt,
  cipherDecrypt: cipherDecrypt
};
/* eslint-enable object-shorthand */
