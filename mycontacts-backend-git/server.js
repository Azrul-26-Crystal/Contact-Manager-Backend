const express = require("express")
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConnection")
const contactRouter = require("./routers/contact.router")
const userRouter = require("./routers/user.router")
const errorHandler = require("./middleware/errorHandler")

const app = express()
app.use(express.json())
app.use(errorHandler)
connectDb()

app.use("/api/contacts",contactRouter)
app.use("/api/users",userRouter)

const port = process.env.port || 5001

app.listen(port,()=>{
        console.log("Server is running on port",port)
})
