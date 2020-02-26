const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
// const normalize = require('normalize-url');
const Items = require('../../models/Items')

// @route    GET api/itemshop
// @desc     Get current users profile
// @access   Public
router.get('/', async (req, res) => {
  try {
    const items = await Items.find()
    if (!items) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/itemshop
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
    [auth,
      [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
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
      if(req.user.type!=="admin"){
        return res.status(401).json({ msg: 'User not authorized' })
      }
    const {
      name,
      picture,
      description,
      date,
      price,
      species,
      likes
    } = req.body;

    let itemsFields = new Items({
      name,
      picture,
      description,
      date,
      price,
      species,
      likes
    }) ;
     // Using upsert option (creates new doc if no match is found):
      const items= await itemsFields.save()
      res.json(items);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    GET api/itemshop/:item_id
// @desc     Get profile by user ID
// @access   Public
router.get('/:item_id', async (req, res) => {
  try {
    const items = await Items.findOne({
      _id: req.params.item_id
    });

    if (!items) return res.status(400).json({ msg: 'Item not found' });

    res.json(items);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/PROFILE
// @desc     Modify user + profile
// @access   Private

router.put(
  '/:item_id',
  [auth,
    [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('price', 'Price is required')
      .not()
      .isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    if(req.user.type!=="admin"){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    const {
      name,
      picture,
      description,
      price,
      species
    } = req.body;

    const modItem = {
      name,
      picture,
      description,
      price,
      species
    };

    try {
      const item = await Items.findOneAndUpdate({ _id:req.params.item_id }, {$set:{...modItem}}, {new: true});
      await item.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/itemshop/:item_id
// @desc     Delete profile by user ID
// @access   Private
router.delete('/:item_id',auth, async (req, res) => {
  try {
    if(req.user.type!=="admin"){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    const items = await Items.findOneAndRemove({
      _id: req.params.item_id
    });

    if (!items) return res.status(400).json({ msg: 'Item not found' });
    res.json({msg: "removed"})
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
