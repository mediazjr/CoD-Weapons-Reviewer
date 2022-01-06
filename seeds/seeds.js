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

  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: weapons[Math.floor(Math.random() * weapons.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
