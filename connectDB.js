const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PW}@cluster0.gb9s6.mongodb.net/${DB_NAME}`;

const connectDB = server => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    .then(() => server())
    .catch(err => console.log('err happened in db connection!', err));
};

module.exports = connectDB;
