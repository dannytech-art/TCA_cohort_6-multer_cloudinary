const express = require('express')
require('./config/database')
const userRouter = require('./routers/userRouter')
const app = express()
app.use(express.json())
app.use(userRouter)
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})