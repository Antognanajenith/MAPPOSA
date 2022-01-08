const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose =require("mongoose");
const Userrouter = require("./Routes/user");
const Pinrouter = require("./Routes/Pin");
const cors = require("cors");

//config section
dotenv.config();
app.use(express.json());
app.use(cors());

//mongo connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("mongo-connected");
})
.catch((err)=>console.log(err));

//apiuse -router
app.use("/api/users" ,Userrouter);
app.use("/api/pins" ,Pinrouter);






//listening section 
app.listen(3003, ()=>{
    console.log("Server started perfectly");
});