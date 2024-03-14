const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = mongodb+srv://samuel:qazvmlpt@cluster0.ymtwbi6.mongodb.net/natours

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected mongoose');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App runing on port ...', port);
});
