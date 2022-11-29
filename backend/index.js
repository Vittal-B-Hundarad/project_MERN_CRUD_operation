const express = require('express');
const cors=require('cors');
require('./DB/config');
const User =require('./DB/User');
const Products= require('./DB/products');
const { response } = require('express');
const app= express();
const jwt=require('jsonwebtoken');
const jwtkey='e-comm';

app.use(express.json());
app.use(cors());

app.post("/register",async (req, res)=>{
    let user=new User(req.body);
    let result=await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"Something went wrong ,Please try after some time!"})
        }
        res.send({result,auth:token});
    })
})

app.post("/login", async (req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email)
    {
        let user= await User.findOne(req.body).select("-password");
        if(user)
        {
            jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"Something went wrong ,Please try after some time!"})
                }
                res.send({user,auth:token});
            })
            
        }
        else{
            res.send({results:'No User Found'})
        }
    }
    else{
        res.send({results:'No User Found'})
    }
    
})

app.post('/add-product',async (req,res)=>{
let products=new Products(req.body);
let result=await products.save();
res.send(result);
})


app.get('/products',async (req,res)=>{
    let products=await Products.find();
    if(products.length>0)
    {
        res.send(products);
    }
    else{
        res.send({result:"no result found"});
    }
})

app.delete('/product/:id',async (req,res)=>{
    const result = await Products.deleteOne({_id:req.params.id})
    res.send(result)
})


app.get('/product/:id',async (req,res)=>{
    let result =await Products.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No record found"})
    }
})

app.put('/product/:id',async(req,res)=>{
    let result= await Products.updateOne(
    {_id:req.params.id},
    {
        $set:req.body
    }
    );
    res.send(result);

})


app.get("/search/:key",async(req,res)=>{
    let result=await Products.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {id:{$regex:req.params.key}},
            {expiryDate:{$regex:req.params.key}}
        ]
    });
    res.send(result);
});


app.get('/only100',async (req,res)=>{
    let products=await Products.find();
    if(products.length>0)
    {
        res.send(products);
    }
    else{
        res.send({result:"no result found"});
    }
})

// function verifyToken(req,res,next){
//     let token =req.headers['authorization']

//     if(token){
//         token=token.split(' ')[1];
//         console.warn("Middleware called",token);
//         jwt.verify(token,jwtkey,(err,valid)=>{
//          if(err){
//            res.status(401).send({result:"please provide valid token"});
//          }else{
//            next();
//          }
//         })
//     }
//     else{
//        res.status(403).send({result:"please add token with header"});
//     }

// }
app.listen(5000);