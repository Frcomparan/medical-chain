const crypto = require('crypto');

function getKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 512,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            privateKey: privateKey.replace(
              /(-----(BEGIN|END) PRIVATE KEY-----|\n)/g,
              ''
            ),
            publicKey: publicKey.replace(
              /(-----(BEGIN|END) PUBLIC KEY-----|\n)/g,
              ''
            ),
          });
        }
      }
    );
  });
}

module.exports = { getKeyPair };
