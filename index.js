// * Before starting parallely run `mkdir -p ~/data/db && mongod --dbpath ~/data/db` 
const mongoose = require('mongoose');
const debugBasic = require('debug')('mongo:basic');

mongoose.connect('mongodb://localhost/playground')
  .then(() => debugBasic('Connected to MongoDB 🌱'))
  .catch(err => debugBasic('Error in connecting 🍃', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 25,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: (val, callback) => {
        setTimeout(() => {
          const result =  val && val.length > 0;
          callback(result);
        }, 2000);
      },
      message: 'A Course must have atleast 1 tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 5,
    max: 999,
    required: function() {
      return this.isPublished;
    }
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'SCSS Crash Course',
    category: 'web',
    author: 'Youtube',
    tags: ['frontend', 'styles'],
    isPublished: true,
    price: 5.99
  });
  try {
    debugBasic('11');
    await course.validate();
    debugBasic('22');
    const result = await course.save();
    debugBasic(result);
  } catch (err) {
    for (const field in err.errors) {
      if (err.errors.hasOwnProperty(field)) {
        debugBasic('🤬', err.errors[field].message);
      }
    }
  }
}
createCourse();

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
  debugBasic(result); // freturn the doc which got updated
}
// updateByQueryFirst('5ec330aa4fe68134c437ecfa');

async function updateByUpdateFirst(id) {
  const result = await Course.update({_id: id}, {
    $set: {
      isPublished: false,
      author: 'Raja Vasanth'
    }
  });
  debugBasic(result); // { n: 1, nModified: 1, ok: 1 } Here it wont return the doc.
}
// updateByUpdateFirst('5ec330aa4fe68134c437ecfa');

async function updateByFindAndUpdate(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      isPublished: true,
      author: 'Jack Sparrow'
    }
  }, {new: true});
  debugBasic(course); // return doc.
}
// updateByFindAndUpdate('5ec330aa4fe68134c437ecfa');

async function removeCourse(id) {
  const result = await Course.deleteOne({_id: id});
  // const result = await Course.deleteMany({isPublished: true});
  debugBasic(result);
}
// removeCourse('5ec65bf24f4a3a13138b0df5');


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


  