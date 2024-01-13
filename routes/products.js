const express=require('express');
const router=express.Router();

//initalizing products controller
const productsController=require('../controllers/products_controller');

//to get all the products
router.get('/',productsController.products);

//to create a product
router.post('/create',productsController.create);

//to delete a product using ID
router.delete('/:id', productsController.delete);

//to update the quantity of a product
router.put('/:id/update_quantity/', productsController.updateQuantity);

module.exports=router;