const mongoose= require('mongoose')
const mongoUri= "mongodb+srv://debojit:debo10star@inotebook.abk4wwq.mongodb.net/test"

const connectToMongo= ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully")
    })
}

module.exports= connectToMongo;