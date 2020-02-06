require('../../db');
require('./TypeSchema');
const mongoose = require('mongoose');
const Type = mongoose.model('Type');
module.exports = {
    /**
     * Find all users
     * @param req
     * @param res
     */
    getAllSkillTypes: async()=> {
        try {
            const Types = await Type.find();
            return Types
        } catch (error) { 
            console.log(error);
        } 
    },
    addNewSkillType: async(reqBody)=>{
        try{
            const {name, shortName} = reqBody;            
            var type = new Type({name, shortName});
            await type.save();
            return 1;
        }catch(error){
            console.log(error);
            return 0;
        }
    }
};