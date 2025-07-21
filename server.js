const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();

// ✅ Serve static files from the public folder
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB at ${mongoose.connection.name}`);
});

const Fruit = require('./models/fruit.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find({});
  res.render('fruits/index.ejs', { allFruits });
});

app.get("/fruits/new", (req, res) => {
  res.render('fruits/new.ejs');
});

app.get('/fruits/:id/edit', async (req, res) => {
  const fruit = await Fruit.findById(req.params.id);
  res.render('fruits/edit.ejs', { fruit });
});

app.get('/fruits/:id/delete', async (req, res) => {
  const fruit = await Fruit.findById(req.params.id);
  res.render('fruits/delete.ejs', { fruit });
});

app.post('/fruits', async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === 'on';
  await Fruit.create(req.body);
  res.redirect('/fruits');
});

app.put('/fruits/:id', async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === 'on';
  await Fruit.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/fruits');
});

app.delete('/fruits/:id', async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.id);
  res.redirect('/fruits');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
