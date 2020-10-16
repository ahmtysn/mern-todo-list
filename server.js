const express = require('express');
const app = express();
const connectDB = require('./connectDB');

const enableCORS = require('./enableCORS');

const todosRouter = require('./todosRouter.js');

app.use(express.json());
app.use(enableCORS);

app.use('/todos', todosRouter);

const PORT = process.env.PORT || 5000;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
  });
};

connectDB(server);
