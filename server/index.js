const express=require("express")
const cors=require("cors")
require("dotenv").config()
const bodyParser = require('body-parser');

// import routes
const AuthRoutes=require("./Routers/AuthRoutes")
// make app obj
const app=express()



app.use(bodyParser.raw({ type: 'application/octet-stream' }));

app.use(express.json())
app.use(cors({
    origin:"*"
}))


// use routes

app.use(AuthRoutes)

app.use("/home",(req,res)=>{
    res.send("hey buddy")
})


const port=process.env.PORT || 8080

app.listen(port,()=>{
    console.log("listening on the port",port);
})
