const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Get all tags and include associated Product model
router.get('/', async (req, res) => {
try {
  const tagData= await Tag.findAll({
    include:[{model: Product}], 
  });
  res.status(200).json(tagData);
}catch(err){
  res.status(500).json(err);
}
});

//GET single tag based on its id and including the associated Product model
router.get('/:id', async (req, res) => {
  try{
    const tagData= await Tag.findByPk(req.params.id, {
      include: [{model:Product}], 
    });
    if (!tagData){
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//CREATE a tag using the requried parameters of tag_name
router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(400).json(err);
  }
});

//UPDATE a tag using the required parameters of tag name in order to update and using the id
router.put('/:id', async (req, res) => {
  try{
    const tagData= await Tag.update({
      tag_name: req.body.tag_name
    }, {
    //Gets the tag based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(tagData);
  }catch(err){
    res.status(400).json(err);
  }
});

//DELETE a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
