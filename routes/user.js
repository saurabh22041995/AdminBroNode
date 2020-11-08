const express=require('express');
const userRouter=express.Router();

userRouter.get('/',async(req,res)=>{
    try{
         res.send('Hello World');
    }
    catch(e){
        res.status(404).send(e);
    }
})

module.exports=userRouter;
