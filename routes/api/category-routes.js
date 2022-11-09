const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//GET all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findall({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});
//GET a single category and its associated product
router.get('/:id', async (req, res) => {
try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  });
  if (!categoryData){
    res.status(404).json({message: 'No category found with that id!'});
    return;
  }
  res.status(200).json(categoryData);
}catch(err){
  res.status(500).json(err);
}
});

//CREATE a category
router.post('/', async (req, res) => {
  try{
    const categoryData= await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
 
});
  //UPDATE a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const categoryData= await Category.update({
      category_name: req.body.category_name
    }, {
    //Gets the category based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }

});
  //DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where:{
        id: req.params.id, 
      },
    });
    if(!categoryData){
      res.status(404).json({message:'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }

});

module.exports = router;
