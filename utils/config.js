require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.NODE_ENV==='test'
  ?process.env.TEST_MONGODB_URL
  :process.env.MONGODB_URL

console.log(`Current mode: ${process.env.NODE_ENV}`)
console.log(`Current URI: ${MONGODB_URI}`);

module.exports = {MONGODB_URI,PORT};

