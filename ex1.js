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
  const courses = await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 'asc'})
    .select({name:1, author:1})
  
  debugEx1(courses);
}

getCourses();

// async function run() {
//   const courses = await getCourses();
//   console.log(courses);
// }

// run();