const router = require('express').Router();
const { Review, User, Weapon } = require('../models');
const withAuth = require('../utils/auth');


// router.get('/', async(req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const weaponData = await Weapon.findAll({
//             include: [{
//                 model: User,
//                 through: Review,
//                 as: "review_users",
//                 attributes: ['name'],
//             }, ],
//         });

// // Serialize data so the template can read it
// const weapons = weaponData.map((weapon) => weapon.get({ plain: true }));
// // res.json(weapons)
// // Pass serialized data and session flag into template
// res.render('homepage', {
//     backgroundImage: "/Images/landing.jpg",
//     weapons,
//     logged_in: req.session.logged_in
// });
// }
// catch (err) {
//     res.status(500).json(err);
// }
// });

// Use withAuth middleware to prevent access to route
router.get('/', async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Weapon, through: Review, as: "user_reviews" }],
        });
        // console.log(userData)
        const user = userData.get({ plain: true });
        // console.log(user)
        res.render('profile', {
            backgroundImage: "/Images/landing.jpg",
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/weapon/:weapon_category', async(req, res) => {
    try {
        const weaponData = await Weapon.findAll({
            where: {
                weapon_category: req.params.weapon_category
            }
        }, {
            include: [{
                model: User,
                through: Review,
                as: "review_users",
                attributes: ['name'],
            }, ],
        });


        let backgroundImage;
        if (req.params.weapon_category === "SniperRifles") {
            backgroundImage = "/Images/page4.png"
        } else if (req.params.weapon_category === "SubMachineGuns") {
            backgroundImage = "/Images/page_2.jpg"
        } else if (req.params.weapon_category === "AutomaticAssaultRifles") {
            backgroundImage = "/Images/page_3.jpg"
        }



        const weapons = weaponData.map((weapon) => weapon.get({ plain: true }));
        // res.json(weapons)
        res.render('weapon', {
            backgroundImage,
            weapons,
            category: req.params.weapon_category.replace(/([a-z])([A-Z])/g, '$1 $2'),
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/review/:id', async(req, res) => {
    try {
        const reviewData = await User.findByPk(req.params.id, {
            include: [{
                model: Weapon,
                through: Review,
                as: "user_reviews",
                attributes: ['name'],
            }, ],
        });

        const reviews = reviewData.get({ plain: true });
        // res.json(reviews)
        res.render('review', {
            ...reviews,
            logged_in: req.session.logged_in,
            backgroundImage: "/Images/WZ-FUTURE-003.jpg",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});




router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;