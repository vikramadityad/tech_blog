const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require('bcrypt');
const isAuthenticated = require('../../config/middleware/isAuthenticated'); // Import the isAuthenticated middleware

// Homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
      currentUser: req.session.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }
    if (!bcrypt.compareSync(req.body.password, userData.password)) {
      res.status(403).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


router.post('/signup', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt);
    const userData = await User.create({
      username: req.body.username,
      password: hash
    })
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something really bad happened" })
  }
});

// Logout route (requires authentication)
router.post('/logout', isAuthenticated, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

// Dashboard route (requires authentication)
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'createdAt'],
          order: [['createdAt', 'DESC']],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'createdAt'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: Post,
              attributes: ['title'],
            },
          ],
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      user,
      loggedIn: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


//create post route 

router.get('/posts/new', isAuthenticated, (req, res)=> {
  res.render('posts/new')
})

router.post('/posts', isAuthenticated, async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  });
  res.redirect('/dashboard');
})

// edit post route 

router.get('/posts/:id/edit',  isAuthenticated, async (req, res) => {
  console.log("test");
  const post = await Post.findOne({
    where: {id:req.params.id,user_id:req.session.user_id} 
  })

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.render('posts/edit', {
      post,
      user: req.session.username,
      loggedIn: req.session.loggedIn, 
  });


});



// Individual post route
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'createdAt'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // show blog

    const post = postData.get({ plain: true });

    res.render('posts/show', {
      post,
      user: req.session.username,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// comments post route 

router.post('/posts/:id/comments', async (req,res) => {
  const post = await Post.findByPk(req.params.id);
  if(!post) {
    res.status(404).send("Unable to find the post");
    return;
  }
  const comment = await Comment.create({
    content: req.body.content,
    post_id: post.id,
    user_id: req.session.user_id
  });
  res.redirect(`/posts/${post.id}`);
})


// delete post route 




module.exports = router;





