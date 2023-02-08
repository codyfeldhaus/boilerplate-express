let express = require('express'); //similar to importing React
let app = express();
require('dotenv').config() //loads environment variables

console.log("Hello World");
console.log(process.env.MENU_API_KEY);
console.log(process.env.BG_COLOR);

//Syntax for routes in Express
//app.METHOD(PATH, HANDLER)

//HANDLER syntax:
/*
function(req, res) {
  res.send('Response String');
}
(req, res) => {
  res.send('Response String');
}
 */

//serve the string "Hello Express" to GET requests matching / (root path)

//app.get("/", (req, res) => res.send("Hello Express"));

//app.get("/heading", (req, res) => res.send("<h1>This is a heading!</h1>"))

//app.get("/heading/more-headings", (req, res) => res.send("<h3 style='color: blue;'>This is another heading!</h3>"))

//serve the index.html file in the views folder to GET requests matching the root path
//use res.sendFile(), which requires an absolute path
//absolutePath = __dirname + relativePath/file.ext

//want middleware to log regardless of request method
//need this to come first because it should apply to all requests
app.use(logMiddleware)

//serve static assets with app.use() and express.static()
//examples of static assets: css stylesheets, javascript scripts, images, etc.
const pathToAssets = __dirname + "/public"; //path on my server
app.use("/public", express.static(pathToAssets)); //specifying paths for client requests


const pathToIndex = __dirname + "/views/index.html";
app.get("/", (req, res) => res.sendFile(pathToIndex));

const pathToAbout = __dirname + "/views/about.html";
app.get("/about", (req, res) => res.sendFile(pathToAbout));

const pathToContact = __dirname + "/views/contact.html";
app.get("/contact", (req, res) => res.sendFile(pathToContact));


//serving either blue or red html file to get requests to the path /color
//based on the value of our environment variable
app.get("/color", (req, res) => {
  let pathToColor;
  if (process.env.BG_COLOR == "blue") {
    console.log("blue")
    pathToColor = __dirname + "/views/blue.html";
  }
  else if (process.env.BG_COLOR == "red") {
    console.log("red")
    pathToColor = __dirname + "/views/red.html";
  } else {
    res.send("404 - Page Not Found");
    return
  }
  console.log("Is this ran?")
  res.sendFile(pathToColor);
})

// app.get("/color", (req, res) => {
  
//   if (process.env.COLOR == "blue") {
//     let pathToBlue = __dirname + "/views/blue.html";
//     res.sendFile(pathToBlue);
//   }
//   else if (process.env.COLOR == "red") {
//     let pathToRed = __dirname + "/views/red.html";
//     res.sendFile(pathToRed);
//   }
  
// })

//serve JSON data with app.get() and res.json()
app.get("/json", (req, res) => {
  let message = "hello json";
  let name = "cody";
  let age = 31;
  if (process.env.MESSAGE_STYLE == "uppercase") {
    console.log("json");
    message = message.toUpperCase();
    name = name.toUpperCase();
  }
  
  const jsonObj = {
    "message": message,
    "name": name,
    "age": age
  }

  res.json(jsonObj)
});

//authentication middleware
app.get("/users/:username", authenticationMiddleware, (req, res) => {
  const username = req.params.username;
  res.send(`Hello, ${username}!`);
} )

//middleware syntax
/*

req = request object, res = response object, next = the next function in the middleware pipeline
function someMiddleware(req, res, next) {
  //some code that does stuff
  next();
}

*/

//log middleware
//log message to console for every request
//format: "{method} {path} - {ip}"
//access using req.method, req.path, and req.ip

function logMiddleware(req, res, next) {
  console.log(`${req.method} request was made to path: ${req.path} by IP: ${req.ip}`);
  next();
}

//authentication middleware
function authenticationMiddleware(req, res, next) {
  const token = req.header("Authorization");
  //if (token == "secret-token") {
  if (5 == 5) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}




module.exports = app;

