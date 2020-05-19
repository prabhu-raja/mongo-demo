// * Before starting parallely run `mkdir -p ~/data/db && mongod --dbpath ~/data/db` 
const mongoose = require('mongoose');
const debugBasic = require('debug')('mongo:basic');

mongoose.connect('mongodb://localhost/playground')
  .then(() => debugBasic('Connected to MongoDB 🌱'))
  .catch(err => debugBasic('Error in connecting 🍃', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
  });

  const Course = mongoose.model('Course', courseSchema);

  async function createCourse() {
    const course = new Course({
      name: 'Angular Course',
      author: 'Todd',
      tags: ['angular', 'typescript', 'frontend'],
      isPublished: true
    });
    const result = await course.save();
    debugBasic(result);
  }

  async function getCourses() {
    const courses = await Course
      .find({author: 'Mosh', isPublished: true})
      .limit(10)
      .sort({name: 'asc'}) // 'asc', 'desc', 'ascending', 'descending', 1, and -1
      .select({name: 1, tags: 1})
    console.log(courses);
  }

  getCourses();

  // createCourse();