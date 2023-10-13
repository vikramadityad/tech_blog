const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated'); // Import the isAuthenticated middleware

// Create a new user (requires authentication)
router.post('/users', isAuthenticated, async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.status(201).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});





// Create a new post (requires authentication)
router.post('/posts', isAuthenticated, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a post (requires authentication)
router.put('/posts/:id', isAuthenticated, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a post (requires authentication)
router.delete('/posts/:id', isAuthenticated, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).send('Post deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new comment (requires authentication)
router.post('/comments', isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
