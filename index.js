// index.js

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const hostname = '127.0.0.1';
const port = 3000

app.use(express.json()) // body parser to parse JSON

const users = [
  {
    username: "Mario", password: "Nintendo"
  }
]

const games = [
  { name: "Zelda TOK", gametimeseconds: 457436 },
  { name: "Splatun X", gametimeseconds: 657568 },
  { name: "Animal Crossing", gametimeseconds: 3996957 }
]

function authenticate(req, res, next) {
  const headers = req.headers["authorization"];
  if(headers) {
    // token example: "Bearer cytrytrfvgbui78oybnhoi..."
    // token.split(" ")[1] = "cytrytrfvgbui78oybnhoi..."
    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token, "SUPER-SECRET-KEY")

    if(decoded) {
      const decodedUser = decoded.username
      const targetUser = users.find(user => user.username.toLowerCase == decodedUser.toLowerCase)

      if(targetUser) {
	    // ok case!
        next()
      }
      else {
	      // good token but need server side user!
        res.json({message: "Unautorized access"})
      }
    }
    else {
      // bad token!
      res.json({message: "Unautorized access"})
    }
    
  }
  else {
    // need token!
    res.json({message: "Unautorized access"})
  }
}

app.get("/test", (req, res) => {
  res.json({ message: "Hello World! Server is runing!" });
});

app.get("/mygames", authenticate, (req, res) => {
  res.json(games)
})

app.post("/login", (req, res) => {

  const username = req.body.username
  const password = req.body.password

  const authUser = users.find(user => user.username.toLowerCase == username.toLowerCase && user.password == password)

  if(authUser) {
    // generate a token
    const token = jwt.sign({username: username}, "SUPER-SECRET-KEY")
    if(token) {
      res.json({token: token})
    }
    else {
      res.json({message: "Auth failed!", succes: false})
    }
  }
  else {
    res.json({message: "User or Password wrong!", succes: false})
  }
})

// listen for requests
const listener = app.listen(port, () => {
  // server starts here!
  console.log("Local server is started!");
  console.log(`Server running at http://${hostname}:${port}/`);
});
