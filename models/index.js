const Category = require('./category');
const Product = require('./product');
const Tag = require('./tag');
const ProductTag = require('./productTag');

// products belongs to category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// categories have many products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// products belong to many tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
});

// tags belong to many products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
});

module.exports = { Category, Product, Tag, ProductTag };