const { User } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const userController = {
  // Create a new user
  async createUser(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ username, password: hashedPassword });

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.status(201).json(user);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Login user
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        res.status(400).json({ message: 'Incorrect username or password' });
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({ user, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Logout user
  async logoutUser(req, res) {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
