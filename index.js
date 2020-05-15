const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const parser = require('body-parser');
const cors = require("cors");
const morgan = require('morgan');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let mongoURI = 'mongodb+srv://dbadmin:dbadmin@cluster0-5h2cq.mongodb.net/test?retryWrites=true&w=majority'
// let mongoURI = ''
// if(process.env.NODE_ENV === "production") {
//     mongoURI = process.env.DB_URL
// } else {
//   mongoURI = 'mongodb+srv://dbadmin:dbadmin@cluster0-5h2cq.mongodb.net/test?retryWrites=true&w=majority'
// }


// else {
//     mongoURI = 'mongodb://localhost/drawsocket'
// }

mongoose.connect(mongoURI, { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://dbadmin:dbadmin@cluster0-5h2cq.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongodb+srv://dbadmin:<password>@cluster0-5h2cq.mongodb.net/test?retryWrites=true&w=majority
// mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/drawsocket");
module.exports = mongoose

const nameSchema = new mongoose.Schema({ firstName: String });
const User = mongoose.model("User", nameSchema);
// ROUTES
// const userRoutes = require('./routes/users')
// app.use('/users', userRoutes)

app.use(express.static(__dirname + '/public'));
// app.post("/addname", (req, res) => {
//   const myData = new User(req.body);
//   myData.save()
//   .then(item => {
//   res.send("item saved to database like a B0$$");
//   })
//   .catch(err => {
//   res.status(400).send("unable to save to database oh bummer");
//   });
// });

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('everyday im listening on port ' + port));