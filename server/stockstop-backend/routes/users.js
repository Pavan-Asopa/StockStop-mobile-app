
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      //const users = queryUsers;
      if(users.length === 0){
        console.log("No matching users");
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password,saltRounds)
        await req.db.from("users").insert({email, hash})
        res.status(201).json({
        success: true,
        message: "New user created"
        })}
      else {
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

    })
   



  // //2. determine if user exists in table
  //   const queryUsers = req.db.from("users").select("*").where("email", "=", email)
  //   queryUsers
  //     .then((users) => {
  //       if(users.length > 0) {
  //         throw new Error('User already exists')
  //         // res.status(400).json({
  //         //   error: true,
  //         //   message: "User already exists"
  //         // })
  //         //console.log("User already exists");
  //         return;
  //       }
  //       //2.1 If they do not exist insert them in to the table
  //       console.log("No matching users");

  //       const saltRounds = 10;
  //       const hash = bcrypt.hashSync(password,saltRounds)
  //       return req.db.from("users").insert({email, hash})
  //     })
  //     .then(() => {
  //       res.status(201).json({
  //         success: true,
  //         message: "New user created",
  //       });
  //     })
  //     .catch((error) => {
  //       res.status(400).json({error: true, message: error.message})
  //     });
    // });
    
    //2.2 If they do exist, return error response -- COMEBACK TO THIS


router.post('/login', function(req, res, next) {
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
  const queryUsers = req.db.from("users").select("*").where("email", "=", email)
  queryUsers
    .then((users) => {
      if(users.length === 0) {
        res.status(401).json({
          error: true,
          message: "User does not exist"
        })
        console.log("User does not exist");
        return;
      }
      console.log("User exists in table");

      const user = users[0];
      return bcrypt.compare(password, user.hash);
  })
  .then((match) => {
    if(!match) {
      console.log("Passwords do not match");
      res.status(401).json({
        error: true,
        message: "Incorrect password enetered"
      })
      return;
    }
  });

//Create and return JWT token
  const secretKey = "secret key" // should use .env for something secret
  const expires_in = 60*60*24; // 1 day
  const exp = Date.now() + expires_in * 1000;

  const token = jwt.sign({email, exp}, secretKey);
  res.json({token_type: "Bearer", token, expires_in});
});


module.exports = router;
