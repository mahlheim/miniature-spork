const sequelize = require('../config/connection');
const { Category, Product, Tag, ProductTag } = require('../models');

const categorySeedData = require('./categorySeedData');
const productSeedData = require('./productSeedData');
const tagSeedData = require('./tagSeedData.json');
const productTagSeedData = require('./productTagSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const categories = await Category.bulkCreate(categorySeedData);

  const products = await Product.bulkCreate(productSeedData);

  const tags = await Tag.bulkCreate(tagSeedData);

  const productTags = await ProductTag.bulkCreate(productTagSeedData);

  process.exit(0);
};

seedDatabase();