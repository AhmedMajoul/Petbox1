const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route    GET api/users/:id
// @desc     Register user
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
        return res.status(404).json({msg:"User not found"})
      }

    res.json(user);
  } catch (err) {
    console.error(err.message);
  if(err.kind==="ObjectID"){
      return res.status(404).json({ msg: 'User not found' });
  }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('adress', 'Adress is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, adress, phone } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        adress,
        phone
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          type: user.type
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    Get api/user
// @desc     Get all user
// @access   Private

router.put(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('adress', 'Adress is required')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      avatar,
      password,
      adress,
      phone,
      type
    } = req.body;

    
    const modUser = {
      name,
      email,
      avatar,
      password,
      adress,
      phone,
      type
    };

    const salt = await bcrypt.genSalt(10);

    modUser.password = await bcrypt.hash(password, salt);

    try {
      const user = await User.findOneAndUpdate({ _id: req.user.id }, {$set:{...modUser}}, {new: true});

      await user.save();
     
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    Get api/users
// @desc     Get all users
// @access   Private

router.get('/', auth, async (req, res) => {
  try {
    if(req.user.type!=="admin"){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private

router.delete('/:user_id', auth, async (req, res) => {
  try {
    if(req.user.type!=="admin"){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    // Remove user adoption posts
    await AdoptPost.deleteMany({ user: req.params.user_id });
    // Remove user pet shop posts
    await PetShopPosts.deleteMany({ user: req.params.user_id });
    // Remove user
    await User.findOneAndRemove({ _id: req.params.user_id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
