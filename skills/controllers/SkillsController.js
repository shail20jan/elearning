const Skill = require('../models/Skill');
module.exports = {
    /**
     * Find all users
     * @param req
     * @param res
     */
    findAll: async (req, res)=> {
        try {
            const Types = await Type.getAllSkillTypes();
            res.status(200).json(Types);
        } catch (error) { 
            res.status(500).send("error");
        }         

    },
    create:async (req, res)=>{
        try {
            const saveType = await Type.addNewSkillType(req.body);  
            if(saveType === 1){
                res.status(200).send("A new Skill Type created with success");
            } else {
                res.status(500).send("Some thing went wrong!");
            }   
        } catch(err) {
            res.status(422).send(err.message);
        }  
    }
};