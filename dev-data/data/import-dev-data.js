const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Tours = require('../../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const DB = process.env.DATABASE_2.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const importTours = async () => {
  try {
    await Tours.create(tours);
    console.log('Tours created successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteTours = async () => {
  try {
    await Tours.deleteMany();
    console.log('Tours deleted successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}

console.log(process.argv);
