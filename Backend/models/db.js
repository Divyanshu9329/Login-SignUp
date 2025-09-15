const mongoose = require("mongoose");

const mongo_url = process.env.MONGODB_URI

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("MongoDB connected....");
    }).catch((err)=>{
        console.log("Connection Failed Error:",err);
    })
