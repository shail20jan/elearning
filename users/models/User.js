require('../../db');
require('./UserSchema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = {
    /**
     * Find all users
     * @param req
     * @param res
     */
    getAllUsers: async()=> {
        try {
            const Users = await User.find();
            return Users
        } catch (error) { 
            console.log(error);
        } 
    },
    getUser: async(id)=> {
        try {
            const UserDetails = await User.findById(id);
            return UserDetails
        } catch (error) { 
            console.log(error);
            throw new Error(error); 
        } 
    },
    addNewUser: async(reqBody)=>{
        try{
            const {name, email, password } = reqBody;            
            var user = new User({name, email, password });
            await user.save();
            const token = await user.generateAuthToken();
            return {user, token};
        }catch(error){
            throw new Error(error); 
        }
    },
    findByCredential: async(email, password)=>{
        try{
            const user = await User.findOne({email});
            if(!user){
                throw new Error('Email not found!');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error('Wrong password!');
            } else {
                const token = await user.generateAuthToken();
                return {user, token};
            }
        }catch(e){
            // console.log(e);
            throw new Error('Something went wrong!');
        } 
    },
    removeToken: async(req)=>{
        try{
            req.user.save();
        }catch(e){
            throw new Error('Something went wrong!');
        }
    }
};