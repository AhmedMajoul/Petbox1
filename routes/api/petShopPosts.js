const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const PetShopPosts = require('../../models/PetShopPosts');
const User = require('../../models/User');

// @route    PUT api/petshopposts/modify
// @desc     modify a sel pet post
// @access   Private
router.put( 
    '/modify/:id',
    [
      auth,
      [
        check('text', 'La description est obligatoire')
          .not()
          .isEmpty(),
          check('petRace', 'La race de votre pet est obligatoire')
          .not()
          .isEmpty(),
          check('petPrice', 'Le prix de votre pet est obligatoir')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const petShopPost = await PetShopPosts.findById(req.params.id);
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !petShopPost) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      // Check user 
      if (petShopPost.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      try {  
        const newPetShopPost = {
          text: req.body.text,
          petName: req.body.petName,
          petPhoto: req.body.petPhoto,
          petRace: req.body.petRace,
          petDateOfBirth: req.body.petDateOfBirth,
          petPrice: req.body.petPrice
        };
        const petpost = await PetShopPosts.findOneAndUpdate({ _id: req.params.id }, {$set:{...newPetShopPost}}, {new: true});
        await petpost.save();
        res.json(petpost);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  // @route    POST api/petshopposts
// @desc     Create a sel pet post
// @access   Private
router.post( //  tested (200)ok 
'/',
[
  auth,
  [
    check('text', 'La description est obligatoire')
      .not()
      .isEmpty(),
      check('petRace', 'La race de votre pet est obligatoire')
      .not()
      .isEmpty(),
      check('petPrice', 'Le prix de votre pet est obligatoir')
      .not()
      .isEmpty()
  ]
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPetShopPost = new PetShopPosts({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      petName: req.body.petName,
      petPhoto: req.body.petPhoto,
      petRace: req.body.petRace,
      petDateOfBirth: req.body.petDateOfBirth,
      petPrice: req.body.petPrice
    });

    const petpost = await newPetShopPost.save();

    res.json(petpost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

// @route    GET api/petshopposts
// @desc     Get all petshopposts
// @access   Public
router.get('/', async (req, res) => {// tested (200)ok
    try {
      const posts = await PetShopPosts.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/petshopposts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {// tested with poster user (200)ok / tested with admin (200)ok / tested with non poster user (401)ok
    try {
      const post = await PetShopPosts.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check user (chaging condition to test on the type admin too)
      if ((post.user.toString() !== req.user.id)&&(req.user.type !== "admin")) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await post.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;