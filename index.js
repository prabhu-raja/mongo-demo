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
  // createCourse();

  async function getCourses() {
    const courses = await Course
      .find({author: 'Mosh', isPublished: true})
      .limit(10)
      .sort({name: 'asc'}) // 'asc', 'desc', 'ascending', 'descending', 1, and -1
      // .count()
      .select({name: 1, tags: 1})
    console.log(courses);
  }
  // getCourses();

  async function updateByQueryFirst(id) {
    const course = await Course.findById(id);
    if(!course) { return; }
    course.isPublished = true;
    course.author = 'Author Jack';
    const result = await course.save();
    debugBasic(result);
  }
  updateByQueryFirst('5ec330aa4fe68134c437ecfa');

  /*Comparison Query Operators
    eq (equal)  ex: .find({price: 10})
    ne (not equal)
    gt (greater than)
    gte (greater than or equal to) ex:  .find({price: {$gte: 10}})
    lt (less than)
    lte (less than or equal to)
    in ex: .find({price: {$in: [10, 15, 20]}})
    nin (not in)

    ex:  both gte and lte - .find({price: {$gte: 10, $lte: 20}})
  */

  /* Logical Operators
    ex: wanna find either by author or published after.find() .or([{author: 'Mosh'}, {isPublished: true}])
    ex: wanna find by author and published after.find() .and([{author: 'Mosh'}, {isPublished: true}])
  */

  /* Regex
    Starts with - .find({ author: /^Mosh/ })
    Ends with - .find({ author: /Hamedani$/i })
    Contains - 👇find below
  */
  //  Regex Contains .find({ author: /.*Mosh.*/i })


  