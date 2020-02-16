require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post('/',[
    check('name',"Name is required").not().isEmpty() , 
    check('email','Email is not valid').isEmail(),
    check('password','Password must be more than 6 characters').isLength({ min:6 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() })
    }
    const { name,email,password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({msg:'User already Exist'});
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,process.env.JWTSECRET,{
            expiresIn:360000
        },
        (err,token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch(err){
        res.status(500).send('Server error')
    }
});

module.exports = router;