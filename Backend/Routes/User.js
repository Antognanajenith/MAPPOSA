const Router = require("express").Router();
const UserModel = require("../Models/Users.js");
const bcrypt = require('bcrypt');

Router.post("/register" ,async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpwd = await bcrypt.hash(req.body.password,salt);

        const newUser = new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:hashedpwd,
        });

        const user = await newUser.save();
        res.status(200).json(user._id);

    }catch(er){
        res.status(600).json(er);
    }
});

Router.get("/views",async(req,res)=>{
    try{
        const usered = await UserModel.find();
        res.status(200).json(usered);
    }catch(err){
        res.status(500).json(err);
    }
});
Router.post("/login", async (req, res) => {
    try {
      //find user
      const user = await UserModel.findOne({ username: req.body.username });
      !user && res.status(400).json("Wrong username or password");
  
      //validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validPassword && res.status(400).json("Wrong username or password");
  
      //send response
      res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = Router;