const mongoose = require('mongoose');
// const uri = 'mongodb://infogain:*#Info123@ds263448.mlab.com:63448/elearning';
const uri = 'mongodb://localhost:27017/elearning';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };
mongoose.connect(uri, options).then(
    () => {  console.log("Database is conected"); },
    err => { console.log(err); }
  );