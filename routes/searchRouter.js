const express = require('express');

const searchRouter = express.Router();

const { searchTodos } = require('../controllers/search-controllers');

searchRouter.get('/', searchTodos);

module.exports = searchRouter;
