require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;



//BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoURI = ''
if(process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL
} else {
    mongoURI = "mongodb://localhost/drawsocket"
}


var mongoose = require("mongoose");
// mongoose.Promise = Promise
let mongoURI = ''
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/drawsocket");


// SCHEMA DECLARATION AND MODEL
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastNameName: String
 });
 var User = mongoose.model("User", nameSchema);


// app.get("/", (req, res) => {
//   res.send("Hello World");
//  });
  


app.use(express.static(__dirname + '/public'));
app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database like a B0$$");
  })
  .catch(err => {
  res.status(400).send("unable to save to database yo!!!");
  });
});




function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('everyday im listening on port ' + port));