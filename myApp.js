let express = require('express'); //similar to importing React
let app = express();
require('dotenv').config() //loads environment variables

console.log("Hello World");
console.log(process.env.MENU_API_KEY);

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

const pathToIndex = __dirname + "/views/index.html";
app.get("/", (req, res) => res.sendFile(pathToIndex));


//serve static assets with app.use() and express.static()
//examples of static assets: css stylesheets, javascript scripts, images, etc.
const pathToAssets = __dirname + "/public"; //path on my server
app.use("/public", express.static(pathToAssets)); //specifying paths for client requests

//serve JSON data with app.get() and res.json()

app.get("/json", (req, res) => {
  let message = "hello json";
  let name = "cody";
  let age = 31;
  if (process.env.MESSAGE_STYLE == "uppercase") {
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


module.exports = app;

