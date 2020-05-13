// BACKUP CONNECTION FILE
const mongoose = require('mongoose')
mongoose.Promise = Promise


let mongoURI = ''
if(process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL
} else {
    mongoURI = "mongodb://localhost/drawsocket"
}

mongoose.connect(mongoURI, { useNewUrlParser: true })
module.exports = mongoose

// heroku config:set ....
// original URL:
// mongodb+srv://dbadmin:<password>@cluster0-icgoa.mongodb.net/test?retryWrites=true&w=majority
// add <password>, run ----
// heroku config:set DB_URL="mongodb+srv://dbadmin:dbadmin@cluster0-icgoa.mongodb.net/test?retryWrites=true&w=majority"

// heroku config:set DB_URL="mongodb+srv://dbadmin:dbpassword@cluster0-tqlax.mongodb.net/test?retryWrites=true&w=majority"


// // import mongoose
// const mongoose = require("mongoose");
// // using native ES6 Promises, in place of mongoose's deprecated mpromise library
// // `Promise` will provides us with a couple methods: .then() for success,
// // and .catch() for errors
// mongoose.Promise = Promise
// // set the uri for connecting to our local mongodb
// let mongoURI = ''
// if(process.env.MONGODB_URI) {
//     mongoURI = process.env.MONGODB_URI
// } else {
//     mongoURI = "mongodb://localhost/drawsocket"
// }
// // connect to the database, with the imported mongoose instance
// mongoose.connect(mongoURI, {useNewUrlParser: true})
//  .then(instance => {
//      console.log(`Connected to your AWESOME mongo db: ${instance.connections[0].name}`)
//  }).catch(error => {
//      console.log("Connetion failed uh oh", error)
//  })

// // export mongoose
// module.exports = mongoose;
