const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
});

// userSchema.statics.validateLogin = async(email, password)=>{
    
   
// }

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject;
}

userSchema.methods.generateAuthToken = async function(){ 
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, 'thisismytokencode');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8); 
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
