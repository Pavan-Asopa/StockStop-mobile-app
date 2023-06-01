
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require("../middleware/authorize");
const authorize = require('../middleware/authorize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 

router.post('/register', async function (req, res, next){
  //1. Retieve email and password from req.body
  const email = req.body.email
  const password = req.body.password

  if(!email || ! password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password required"
    })
    return
  }
  try {
    const users = await req.db.from("users").select("*").where("email", "=", email)
    //if user doesnt exist in the table
    if(users.length === 0){
      console.log("No matching users");
    //encrypt password
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password,saltRounds)
      //insert into users table
      await req.db.from("users").insert({email, hash})
      //set status
      res.status(201).json({
        success: true,
        message: "New user created"
      })
    } else {                         //if user exists in table 
      res.status(400).json({
        error: true,
        message: "User already exists"
      })
    }
  } catch(error){
      res.status(500).json({
        error: true,
        message: "User already exists" 
    })
  }
 });
   

router.post('/login', async function(req, res, next) {
  //1. Retrieve email and password from req.body
  const email = req.body.email
  const password = req.body.password

  if(!email || ! password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password required"
    })
    return
  }

  //2. Determine of the user already exists
  try {
  const users = await req.db.from("users").select("*").where("email", "=", email)
  if(users.length === 0) {
    res.status(401).json({
      error: true,
      message: "User does not exist"
    })
  }else {
    console.log("user exists");
    const user = users[0];
    const match = await bcrypt.compare(password, user.hash);
      if(!match) {
        // console.log("Passwords do not match");
        res.status(401).json({
          error: true,
          message: "Incorrect password enetered"
        })}else{
          //Create and return JWT token
          const secretKey = "secret key" // should use .env for something secret
          const expires_in = 60*60*24; // 1 day
          const exp = Date.now() + expires_in * 1000;
  
          const token = jwt.sign({email, exp}, secretKey);
          res.json({token_type: "Bearer", token, expires_in})
        }
      };
 

} catch(error){
  res.status(500).json({
    error: true,
    message: "User already exists" 
})
}})

//   queryUsers
//     .then((users) => {
//       if(users.length === 0) {
//         // res.status(401).json({
//         //   error: true,
//         //   message: "User does not exist"
//         // })
//         console.log("User does not exist");
//         return;
//       }
//       console.log("User exists in table");

//       const user = users[0];
//       return bcrypt.compare(password, user.hash);
//   })
//   .then((match) => {
//     if(!match) {
//       console.log("Passwords do not match");
//       // res.status(401).json({
//       //   error: true,
//       //   message: "Incorrect password enetered"
//       // })
//       return;
//     }
//   });

// //Create and return JWT token
//   const secretKey = "secret key" // should use .env for something secret
//   const expires_in = 60*60*24; // 1 day
//   const exp = Date.now() + expires_in * 1000;

//   const token = jwt.sign({email, exp}, secretKey);
//   res.json({token_type: "Bearer", token, expires_in});
// });


module.exports = router;
