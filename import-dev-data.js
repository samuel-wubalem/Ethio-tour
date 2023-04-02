const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourmodel');
const User = require('./models/usermodel');
const Review = require('./models/reviewmodel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected mongoose');
  });

const reviews = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json', 'utf-8')
);

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours.json', 'utf-8')
);


const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8')
);


const imoporttour = async () => {
  try {
    // await Tour.create(tours, {
    //   validateBeforeSave:false
    // });
    await Review.create(reviews);
    // await User.create(users, {
    //   validateBeforeSave:false
    // });
    console.log('data succuessfully imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteall = async () => {
  try {
    // await Tour.deleteMany();
     await Review.deleteMany();
      // await User.deleteMany();
    console.log('data succuess fully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
console.log(process.argv[2]);
if (process.argv[2] === '--import') {
  imoporttour();
} else if (process.argv[2] === '--delete') {
  deleteall();
}
