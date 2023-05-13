const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const balanceRoutes = require("./routes/balanceRoutes")

const app = express()
connectDB()
app.use(cors())
app.use(express.json())


app.use("/api/auth", userRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/balance", balanceRoutes)




const PORT = process.env.PORT

app.listen(PORT, () => {
     console.log(`Server started in PORT : ${PORT}`)
})