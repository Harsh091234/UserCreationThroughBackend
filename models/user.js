const mongoose = require("mongoose");





const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    image: {
        type: String,
      
    }

});

 const model = mongoose.model("user", userSchema);

 module.exports = model;