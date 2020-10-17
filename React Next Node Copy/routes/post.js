const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const { Post, User }  = require('../models');

try {
  fs.accessSync('uploads');
} catch (err) {
  console.error('CREATE uploads DIRECTORY');
  fs.mkdir('uploads');
}

module.exports = router;