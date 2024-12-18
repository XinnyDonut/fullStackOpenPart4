require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGO_URL

console.log(process.env.PORT);
console.log(process.env.MONGO_URL);

module.exports = {MONGODB_URI,PORT};

