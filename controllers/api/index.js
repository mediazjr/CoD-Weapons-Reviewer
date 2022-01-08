const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
// const weaponRoutes = require('./weaponRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
// router.use('./weapons', weaponRoutes);

module.exports = router;