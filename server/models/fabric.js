const mongoose = require("mongoose");

const fabricSchema = mongoose.Schema({
    name:{
        required:true,
        type : String,
        unique:1,
        maxlength:100
    }
})
const Fabric = mongoose.model('Fabric',fabricSchema);
module.exports = {Fabric}