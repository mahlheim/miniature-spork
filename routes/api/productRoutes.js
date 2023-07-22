const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: [
        'id',
        'product_name',
        "brand_name",
        "price",
        "stock",
        "category_id"
      ],
      include: [{
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
      }
      ]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a product
router.post('/', (req, res) => {
  // use sequelize's `create()` method to add a row to the table
  Product.create({
    product_name: req.body.product_name,
    brand_name: req.body.brand_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id
  })
    .then((newProduct) => {
      // send the newly created row as a JSON object
      res.json(newProduct);
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE product based on its id
router.put('/:id', (req, res) => {
  // calls the update method on the category model
  Product.update(
    {
      // all the fields you can update and the data attached to the request body
      product_name: req.body.product_name,
      brand_name: req.body.brand_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    },
    {
      // gets the category based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedProduct) => {
      // sends the updated category as a json response
      res.json(updatedProduct);
    })
    .catch((err) => res.json(err));
});
  
  // DELETE route for a product with a matching id
  router.delete('/:id', (req, res) => {
    // looks for the product based on id given in the request parameters and deletes the instance from the database
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedProduct) => {
        res.json(deletedProduct);
      })
      .catch((err) => res.json(err));
  });

  module.exports = router;