// const mongoose = require('mongoose')


// const userSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         require: true
//     },
//     password:{
//         type:String,
//         require: true
//     },
//     roles:[{
//         type:String,
//         default: 'Employees'
//     }],
//     active:{
//         type:Boolean,
//         default: 'Employees'
//     }
// })

// module.exports = mongoose.model('User', userSchema)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);