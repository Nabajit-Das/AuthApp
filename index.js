const express=require("express")
const mongoose=require("mongoose")
const bcypt=require("bcryptjs")
const dbConfig=require("./configs/db.configs")
const serverConfig=require("./configs/server.configs")
// const cors=require("cors")
const app=express()

app.use(express.json())
// app.use(cors());
mongoose.connect(dbConfig.DB_URL)
const db=mongoose.connection
db.on("error",(err)=>{
    console.log("Error connecting to database")
})
db.once("open",()=>{
    console.log("Connected to database")
})
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.sendStatus(200);
    next();
  });
  
require("./routes/addUser.routes")(app)

app.listen(serverConfig.PORT,()=>{
    console.log("Server is running on port : ",serverConfig.PORT)
})