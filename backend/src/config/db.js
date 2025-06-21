const mongoose = require("mongoose")

const connectDB = async () =>{

    await mongoose.connect( "mongodb+srv://rk4765505:RWfE11RBBKPUvu8t@cluster0.y5vlias.mongodb.net/");
};

module.exports=connectDB;
//Knb3QJ4YMEZZSjyV