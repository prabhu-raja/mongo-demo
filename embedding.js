const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(JSON.stringify(result, null, 2));
}

async function updateCourse(courseId, authorName) {
  const course = await Course.update(
    { _id: courseId },
    { 
      $set: {
        'author.name': authorName
      }
    });
    console.log(JSON.stringify(course, null, 2));
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(JSON.stringify(courses, null, 2));
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  const result = await course.save();
  console.log(JSON.stringify(result, null, 2));
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  const result = await course.save();
  console.log(JSON.stringify(result, null, 2));
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'John' }),
//   new Author({ name: 'Smith' })
// ]);

// addAuthor('5ed3958ade54a1297a7d6a11', new Author({ name: 'RV' }));

removeAuthor('5ed3958ade54a1297a7d6a11', '5ed3958ade54a1297a7d6a10');

// updateCourse('5ed28948e56ad91b/540da9db', 'John Smith 👨‍🦱');
