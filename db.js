const mongoose= require('mongoose')
const mongoUri= "mongodb+srv://debojit:debo10star@inotebook.abk4wwq.mongodb.net/iNotebook?retryWrites=true&w=majority"

const connectToMongo= ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully")
    })
}

module.exports= connectToMongo;