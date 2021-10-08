const mongoose  = require("mongoose")

const connectToDatabase = (url)=>{
    console.log("hi")
    mongoose.connect(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    const db = mongoose.connection

    db.on("error",()=>{
        console.log("Error occured while connecting db!")
    })
    db.once("open", ()=>{
        console.log("Connected to database!")
    })
}

module.exports = connectToDatabase