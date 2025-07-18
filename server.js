const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB at ${mongoose.connection.name}`);
});

const Fruit = require('./models/fruit.js');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get("/fruits/new", (req, res) => {
  res.send("This route sends the user a form page!");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

