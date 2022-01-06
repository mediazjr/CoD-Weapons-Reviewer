const sequelize = require('../config/connection');
const { User, Review, Weapon } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const weaponsData = require('./weaponsData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const weapons = await Weapon.bulkCreate(weaponsData, {
    individualHooks: true,
    returning: true,
  });

  const review = await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });




  process.exit(0);
};

seedDatabase();
