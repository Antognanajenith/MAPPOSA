const Router = require("express").Router();
const PinModel = require("../Models/Pins.js");

Router.post("/" ,async(req,res)=>{
    const Newpin = new PinModel(req.body)
    try{
        const Savedpin = await Newpin.save();
        res.status(200).json(Savedpin);
    }catch(err){
        res.status(500).json(Savedpin);
    }
});

Router.get("/" ,async(req,res)=>{
    try{
        const pins = await PinModel.find();
        res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = Router;