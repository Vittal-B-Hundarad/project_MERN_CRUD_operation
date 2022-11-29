const mongoose =require('mongoose');

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    id:String,
    expiryDate:String,
    // UserID: String
});

module.exports=mongoose.model("products",productSchema);