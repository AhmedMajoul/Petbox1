const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: Array
  },
  dateBirth: {
    type: Date
  },
  date:{
      type:Date,
      default:Date.now
  },
  species:{
    type:String,
    required:true
  },
  race:{
    type:String,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Pet = mongoose.model('pet', PetSchema);
