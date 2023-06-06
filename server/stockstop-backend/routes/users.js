var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authorize = require('../middleware/authorize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// post request to register new users
router.post('/register', async function (req, res, next){
  // retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;

  // error handle if request is incomplete (missing email and/or password)
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password required"
    });
    return;
  } 
  
  try {
    // query database - look for user with entered email
    const users = await req.db.from("users").select("*").where("email", "=", email);
    
    // check whether user exists in the table
    if (users.length === 0) { // no matching users, can add to table
      console.log("No matching users");
    
      // encrypt password
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);

      // insert new user into users table
      await req.db.from("users").insert({email, hash});
      
      // set status to be a success, as new user was registered
      res.status(201).json({
        success: true,
        message: "New user created"
      });
    } else { // user already exists in the table, error handle
      res.status(400).json({
        error: true,
        message: "User already exists"
      });
    }
  } catch (error){ // catch other errors
      res.status(500).json({
        error: true,
        message: "Internal server error" 
    });
  }
 });

// post request to allow users to login
router.post('/login', async function(req, res, next) {
  // retrieve email and password from req.body
  const email = req.body.email;
  const password = req.body.password;

  // error handle if request is incomplete (missing email and/or password)
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password required"
    });
    return;
  }

  // determine if the user already exists
  try {
    const users = await req.db.from("users").select("*").where("email", "=", email)
    if (users.length === 0) {
      res.status(401).json({
        error: true,
        message: "User does not exist"
      });
    } else {
      console.log("User exists");
      const user = users[0];
      const match = await bcrypt.compare(password, user.hash);
      if (!match) {
        res.status(401).json({
          error: true,
          message: "Incorrect password enetered"
        })
      } else {
        // create and return JWT token
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
      message: "Internal server error" 
    });
  }
});

// POST route to insert an entry (stock) into the watchlist table
router.post('/updatewatchlist', authorize, async (req, res) => {
  const email = req.email; 
  const stockSymbol = req.body.symbol; 
  const stockName = req.body.name;

  try {
    // Insert the entry (stock) into the watchlist table
    await req.db('watchlist').insert({ email, stockSymbol, stockName });

    res.status(201).json({
      success: true,
      message: "Stock added to WatchList"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to add stock to WatchList",
    });
  }
});

// POST route to remove an entry (stock) from the watchlist table
router.post('/deletewatchlist', authorize, async (req, res) => {
  const email = req.email; 
  const stockSymbol = req.body.symbol;

  try {
    // Delete the entry (stock) from the watchlist table
    await req.db('watchlist').where({ email, stockSymbol }).del();

    res.json({
      success: true,
      message: "Stock removed from WatchList"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to remove stock from WatchList"
    });
  }
});

// POST route to query all entries from the watchlist table
router.post('/retrievewatchlist', authorize, async (req, res) => {
  const email = req.email; 
  try {
    // select all symbols from the watchlist table for a user
    const list = await req.db.from("watchlist").select("stockName", "stockSymbol").where("email", "=", email);
    console.log(list);

    res.json({
      success: true,
      message: "Retrieved WatchList",
      watchlist: list
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to retrieve WatchList"
    });
  }
});

// POST route to query current logged in user
router.post('/getemail', authorize, async (req, res) => {
  const email = req.email;
  try {
    res.json({
      success: true,
      message: "Retrieved user information",
      user: email
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to retrieve user information"
    });
  } 
})

module.exports = router;
