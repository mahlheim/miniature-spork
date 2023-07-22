const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: [
        'id',
        'category_name'
      ],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', "brand_name", 'price', 'stock', 'category_id'],
      }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a category
router.post('/', (req, res) => {
    // use sequelize's `create()` method to add a row to the table
    Category.create({
      category_name: req.body.category_name,
    })
      .then((newCategory) => {
        // send the newly created row as a JSON object
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      });
  });

// UPDATE category based on its id
router.put('/:id', (req, res) => {
  // calls the update method on the category model
  Category.update(
    {
      // all the fields you can update and the data attached to the request body
      category_name: req.body.category_name,
    },
    {
      // gets the category based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // sends the updated category as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

// DELETE route for a category with a matching id
router.delete('/:id', (req, res) => {
  // looks for the category based on id given in the request parameters and deletes the instance from the database
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});


module.exports = router;