const mongoose = require('mongoose');

const {Schema}= mongoose;

const UserSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    location :{
        type:String,
        required :true
    },
    email :{
        type:String,
        required :true
    },
    password :{
        type:String,
        required :true
    },
    date :{
        type: Date, 
        default: Date.now
    }
});
// "user" in here is new collection created in the database(GofoodMern) using the UsersSchema format in my atlas 
// and how data is to be (inserted,delete,update) is managed by model here
module.exports = mongoose.model('user',UserSchema);