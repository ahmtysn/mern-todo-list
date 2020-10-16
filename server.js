const express = require('express');
const app = express();
const connectDB = require('./connectDB');

const enableCORS = require('./enableCORS');

const todosRouter = require('./todosRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(enableCORS);

app.use('/todos', todosRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
const PORT = process.env.PORT || 5000;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
  });
};

connectDB(server);
