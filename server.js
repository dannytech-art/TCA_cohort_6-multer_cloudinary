const express = require('express')
require('./config/database')
const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})