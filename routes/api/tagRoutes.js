const router = require('express').Router();
const { Tag } = require('../../models');

// GET all tags
router.get('/tag', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
        attributes: [
            'id',
            'tag_name'
        ],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'brand_name', 'price', 'stock', 'category_id'],
            }
        ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a tag
router.post('/tag', (req, res) => {
    // use sequelize's `create()` method to add a row to the table
    Tag.create({
      tag_name: req.body.tag_name,
    })
      .then((newTag) => {
        // send the newly created row as a JSON object
        res.json(newTag);
      })
      .catch((err) => {
        res.json(err);
      });
  });

// UPDATE tag based on its id
router.put('/product/:id', (req, res) => {
    // calls the update method on the tag model
    Tag.update(
      {
        // all the fields you can update and the data attached to the request body
        tag_name: req.body.tag_name,
      },
      {
        // gets the product based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        // sends the updated product as a json response
        res.json(updatedTag);
      })
      .catch((err) => res.json(err));
  });
  
  // DELETE route for a tag with a matching id
  router.delete('/tag/:id', (req, res) => {
    // looks for the tag based on id given in the request parameters and deletes the instance from the database
    Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedTag) => {
        res.json(deletedTag);
      })
      .catch((err) => res.json(err));
  });

  module.exports = router;