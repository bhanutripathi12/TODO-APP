const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @url           POST /user/create
// @description   Create new user
// @access-mode   Public
router.post('/create', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password // Password will be hashed in User model's pre-save hook
    });

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ status: 'User Created', user, token });
  } catch (error) {
    console.error('Error in /user/create:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// @url           GET /user/getuser
// @description   Get user profile
// @access-mode   Private
router.get('/getuser', auth, async (req, res) => {
  try {
    res.status(200).send({ status: 'User fetched', user: req.user });
  } catch (error) {
    console.error('Error in /user/getuser:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// @url           POST /user/login
// @description   Login to user profile
// @access-mode   Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = await user.generateAuthToken();
    res.status(200).send({ status: 'Login success', token, user });
  } catch (error) {
    console.error('Error in /user/login:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// @url           POST /user/logout
// @description   Logout from user profile
// @access-mode   Private
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.status(200).send({ status: 'Logout successfully' });
  } catch (error) {
    console.error('Error in /user/logout:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
