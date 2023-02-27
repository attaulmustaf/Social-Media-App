

const router = require("express").Router();
const bcrypt = require ("bcrypt");
const User = require("../models/User");

// update user
router.put("/:id",async(req,res)=>
{
  
   console.log("req-----",req.params.id)
    if(req.body.userId=== req.params.id || req.body.isAdmin)
   // if(req.params.id)
     {  
        if(req.body.password){
           try {
         const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password,salt)
         }
         catch(err){
            return res.status(500).json(err)
         }}
         try{
            const user = await User.findByIdAndUpdate(req.params.id,{
               $set : req.body,
            })
            res.status(200).json("Account has been updated")
         }
         catch(err){
            return res.status(500).json(err)
         }
 }
     else{
        return res.status(401).json("You can update only your account")
     }
});

// Delete 
router.delete("/:id",async(req,res)=>{
   if(req.body.userId === req.params.id || req.body.isAdmin){
      try{
         const user = await User.findByIdAndDelete(req.params.id,{
           $set: req.body
         })
         res.status(200).json("Account has deleted")
      }
      catch(err){
         return res.status(500).json(err)
      }
   }
   else{
      return res.status(401).json("you can only delete your own account")
   }
})

// Get User 
router.get("/:id", async(req,res)=>{
   console.log("req",req)
   try {
      const user =  await User.findById(req.params.id);
      const {password,updatedAt, ...other} = user._doc

      res.status(200).json(user)
   } catch (err) {
      res.status(500).json(err)
   }
})

// Follow a user 
router.put("/:id/follow",async(req,res)=>{
   if(req.body.userId  !== req.params.id){
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
         await user.updateOne({$push:{followers:req.body.userId}});
         await currentUser.updateOne({$push:{followings: req.params.userId}});
         res.status(200).json("user has been followed");
      }else{
         res.status(403).json("user has been followed");
      }

    } catch (err) {
      res.status(500).json(err)
    }
   }
   else{
      res.status(403).json("you cant follow yourself")
   }
})
// Un follow User 
router.put("/:id/unfollow",async(req,res)=>{
   if(req.body.userId  !== req.params.id){
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)){
         await user.updateOne({$pull:{followers:req.body.userId}});
         await currentUser.updateOne({$pull:{followings: req.params.userId}});
         res.status(200).json("user has been unfollowed");
      }else{
         res.status(403).json("user has been followed");
      }

    } catch (err) {
      res.status(500).json(err)
    }
   }
   else{
      res.status(403).json("you cant follow yourself")
   }
})
module.exports= router