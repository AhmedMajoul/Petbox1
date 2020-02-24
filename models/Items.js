const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  description: {
    type: String,
  },
  date:{
      type:Date,
      default:Date.now
  },
  price:{
    type:Number,
    required:true
  },
  species:{
    type:String,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
