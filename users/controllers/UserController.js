const User = require('../models/User');
module.exports = {
    /**
     * Find all users
     * @param req
     * @param res
     */
    findAll: async (req, res)=> {
        try {
            const Users = await User.getAllUsers(req);
            res.status(200).json(Users);
        } catch (error) { 
            res.status(500).send({"errMsg":"Some thing went wrong!"});
        }         

    },
    findById:async (req, res)=> {
        try {
            const ID = req.params.uid;
            const UserDetail = await User.getUser(ID);
            res.status(200).json(UserDetail);
        } catch (error) { 
            res.status(500).send({"errMsg":"Some thing went wrong!"});
        }         

    },
    create:async (req, res)=>{
        try {
            const saveUser = await User.addNewUser(req.body); 
            res.status(200).json(saveUser);   
        } catch(err) {
            res.status(422).send({"errMsg":"Some thing went wrong!"});
        }  
    },
    login:async (req, res)=>{
        try {
            const {email, password} = req.body;
            const user = await User.findByCredential(email, password); 
            res.status(200).json(user);   
        } catch(err) {
            res.status(422).send({"errMsg":err.message});
        }
    },
    logout:async (req, res)=>{
        try {
             req.user.tokens = req.user.tokens.filter((token)=>{
                 return token.token !== req.token;
             })
            await User.removeToken(req);
            res.status(200).send("Logged out successfully");   
        } catch(err) {
            res.status(500).send({"errMsg":err.message});
        }
    }
};