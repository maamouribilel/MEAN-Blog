
const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  // uri: 'mongodb://localhost:27017/mean-blog', // Databse URI and database name
  uri: 'mongodb://bilel:bilalos1993@ds157521.mlab.com:57521/mean-blog',
  secret: crypto, // Cryto-created secret
  db: 'mean-blog' // Database name
}