const express = require('express')
const router = express.Router()
const user = require('../models/User')
const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = "MyNameIsVandanaPrabhakarMuthalik"
//validation
router.post("/createuser",[
body ("email").isEmail(),
body("name").isLength({min: 5}),
body("password","incorrect password").isLength({min:5})],
async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //decrypt functions are async mostly
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
      try{
        await user.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success: true});
      }catch (err) {
        console.log(err);
        res.json({success: false});
      }
})

router.post("/loginuser",[
  body ("email").isEmail(),
  body("password","incorrect password").isLength({min:5})],
  async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let email = req.body.email;
        try{
          //findOne() retrieves the entire document for the user,here email is specifies its specific to retrieving emaila dn entire document 
          //if u dont mention email it will retrieve the entire document 
          let userdata= await user.findOne({email});
          if(!userdata){
            return res.status(400).json({errors: "Login in with correct email id"});
          }
          const pwdCompare = await bcrypt.compare(req.body.password,userdata.password) //here userdata.password will be the hashed password
          if(!pwdCompare){
            return res.status(400).json({errors: "Incorrect password!LoginIn with correct password"});
          }
          //data has to object as it is required for signature
          const data = {
            user: {
              id: userdata.id
            }
          }
          const authToken = jwt.sign(data,jwtSecret) //here we can add expiry date also but here untill the user clears cache the data will be there
          return res.json({success: true,authToken: authToken});
        }catch (err) {
          console.log(err);
          res.json({success: false});
        }
})

module.exports = router;