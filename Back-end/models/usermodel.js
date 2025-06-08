const monoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : { 
        type : String, 
        required : true,
        unique : true,
    },
    email :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
    },
    password : {
        type : String, 
        require : true,
        minLength : 6,
    }
});

module.exports = mongoose.model('User', userSchema);