const express = require('express');
const app = express();
const connectDB = require('./util/connectDB');
const enableCORS = require('./util/enableCORS');
const todosRouter = require('./routes/todosRouter.js');
const searchRouter = require('./routes/searchRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(enableCORS);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use('/todos', todosRouter);
app.use('/todos/search', searchRouter);

const PORT = process.env.PORT || 5000;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
  });
};

connectDB(server);
