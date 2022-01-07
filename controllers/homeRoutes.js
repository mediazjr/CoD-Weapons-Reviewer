const router = require('express').Router();
const { Review, User, Weapon } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const weaponData = await Weapon.findAll({
      include: [
        {
          model: User, through: Review, as: "review_users", 
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const weapons = weaponData.map((weapon) => weapon.get({ plain: true }));
    // res.json(weapons)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      weapons, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/weapon/:id', async (req, res) => {
  try {
    const weaponData = await Weapon.findByPk(req.params.id, {
      include: [
        {
          model: User, through: Review, as: "review_users", 
          attributes: ['name'],
        },
      ],
    });

    const weapon = weaponData.get({ plain: true });
// res.json(weapon)
    res.render('review', {
      ...weapon,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Review }],
    // });

    // const user = userData.get({ plain: true });

    res.render('profile', {
      // ...user,
      // logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

