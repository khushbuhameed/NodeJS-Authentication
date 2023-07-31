require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// exports.connectMonggose =()=>{
//     mongoose.connect(process.env.DATABASE_URL,
//     {
//         useNewUrlParser: true
//     })
//     .then((e)=>console.log("Connected to Mongodb =>> Auth-Project"))
//     .catch((e)=>console.log("Not Connect Mongodb"))
// }
const DB = 'mongodb+srv://pawarsubham438:Wf0MHDNpkAE4KE3l@cluster2.627mgrx.mongodb.net/nodejsauthentication?retryWrites=true&w=majority';

mongoose.connect(DB).then(() => {
    console.log('Connection Successful');
}).catch((err) => console.log('No Connection' + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connection to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;