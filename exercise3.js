const mongoose = require('mongoose');
const debugEx1 = require('debug')('mongo:ex1');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => debugEx1('Connected to 🌱 Mongodb Exercises 🏋️‍♂️🏋️‍♂️🏋️‍♂️'))
  .catch(err => debugEx1('Error in connecting 🍃', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({isPublished: true})
    .or([
      {price: {$gte: 15}},
      {name: /.*by.*/i}
    ])
    .sort('-price')
    .select('name author price')
    // .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    // .sort({price: 'desc'})
    // .select({name:1, author:1})
}

async function run() {
  const Courses = await getCourses();
  debugEx1(Courses);
}
run();
