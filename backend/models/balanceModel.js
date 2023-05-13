const mongoose = require('mongoose')

const balanceSchema = mongoose.Schema({
     cashBalance: {
          type: Number
     },
     gCashBalance: {
          type: Number
     }
}, { timeStamps: true }
)

const Balance = mongoose.model("Balance", balanceSchema)

module.exports = Balance