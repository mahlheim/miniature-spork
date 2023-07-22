const router = require('express').Router();
const { Product } = require('../../models');

// GET all products
router.get('/product', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Department }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a product
router.post('/product', (req, res) => {
    // use sequelize's `create()` method to add a row to the table
    Product.create({
      product_name: req.body.product_name,
      brand_name: req.body.brand_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.department_id,
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
router.put('/product/:id', (req, res) => {
    // calls the update method on the product model
    Product.update(
      {
        // all the fields you can update and the data attached to the request body
        product_name: req.body.product_name,
        brand_name: req.body.brand_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.department_id,
      },
      {
        // gets the product based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedProduct) => {
        // sends the updated product as a json response
        res.json(updatedProduct);
      })
      .catch((err) => res.json(err));
  });
  
  // DELETE route for a product with a matching id
  router.delete('/product/:id', (req, res) => {
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