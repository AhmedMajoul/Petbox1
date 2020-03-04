const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetShopPostsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  petName: { type: String },
  petPrice: { type: Number, required: true },
  petPhoto: { type: String },
  petRace: { type: String, required: true },
  petSexe: { type: String, required: true },
  petDateOfBirth: { type: String },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = PetShopPosts = mongoose.model('sellpetpost', PetShopPostsSchema);
