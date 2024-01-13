const Product=require('../models/product');
const mongoose = require('mongoose');

//function to create the product

module.exports.create = async function(req, res) {
    try {
        const { id, name, quantity } = req.body;

        const newProduct = new Product({
            id,
            name,
            quantity
        });

        await newProduct.save();

        res.status(201).json({
            data:{
                product:newProduct
            }
        })
    }catch(err) {
        console.log(`Error in creating a product: ${err}`);
        return res.status(500).json({message: `Error in creating a product: ${err}`});
    }
}
 

//function to show the product


module.exports.products = async function(req, res) {
    try {
        const products = await Product.find({});

        res.status(200).json({
            data:{
                product:products
            }
        })
    } 
    catch(err) {
        console.log(`Error in finding the product: ${err}`);
        return res.status(500).json({message: `Error in finding the product: ${err}`});
    }
}

//function to delete a product according to id

module.exports.delete = async function (req, res) {
    try {
        const { id } = req.params; 
        console.log(`Received product ID: ${id}`); 
        await Product.findByIdAndDelete(id);

        res.status(200).json({
            data:{
                product:"Product Deleted"
            }
        })
    } catch (err) {
        console.log(`Error in deleting the product: ${err}`);
        return res.status(500).json({
            message: `Error in deleting the product: ${err}`,
        });
    }
};


//update the quantity of product of selected id

module.exports.updateQuantity = async (req, res) => {
    try {
        const id = req.params.id; 
        const found = await Product.findById(id);

        if (!found) {
            return res.status(404).send({ message: 'Product not found' });
        }

        // Note - To increment the quantity of the product, put a positive number in the query,
        // and to decrement the quantity, put a negative number in the query.

        const newQty = parseInt(found.quantity) + parseInt(req.query.number);

        // Update the product's quantity
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { quantity: newQty },
            { new: true } // This ensures that you get the updated product as a result
        );

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.send({
            product: updatedProduct,
            message: 'Updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};