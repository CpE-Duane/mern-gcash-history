const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
     transactionType: {
          type: String,
          required: true
     },
     amount: {
          type: Number,
          required: true
     },
     profit: {
          type: Number,
          required: true
     },
     profitType: {
          type: String,
          required: true
     },
     cash: {
          type: Number,
          required: true
     },
     gcash: {
          type: Number,
          required: true
     }
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction