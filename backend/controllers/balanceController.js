const Balance = require("../models/balanceModel")

const getAllBalance = async (req, res) => {
     try {

          const balances = await Balance.find({})

          if (!balances) {
               return res.status(400).send({
                    success: false,
                    message: "There is no balance."
               })
          }

          res.status(200).send({
               success: true,
               message: "Balance fetch successfully.",
               balances: balances
          })
          
     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const updateCashBalance = async (req, res) => {
     try {
          const { id, cashBalance } = req.body

          if (cashBalance <= 0) {
               return res.status(400).send({
                    success: false,
                    message: "Please enter a valid value."
               })
          }

          const idExist = await Balance.findOne({ _id: id })

          if (!idExist) {
               return res.status(400).send({
                    success: false,
                    message: "Balance doesn't exist."
               })
          }

          const updatedBalance = await Balance.findOneAndUpdate(
               { _id: id },
               { $set: { cashBalance: cashBalance } },
               { new: true }
          )

          res.status(200).send({
               success: true,
               message: "Cash Balance updated successfully.",
               balance: updatedBalance
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const updateGCashBalance = async (req, res) => {
     try {
          const { id, gCashBalance } = req.body

          if (gCashBalance <= 0) {
               return res.status(400).send({
                    success: false,
                    message: "Please enter a valid value."
               })
          }

          const idExist = await Balance.findOne({ _id: id })

          if (!idExist) {
               return res.status(400).send({
                    success: false,
                    message: "Balance doesn't exist."
               })
          }

          const updatedBalance = await Balance.findOneAndUpdate(
               { _id: id },
               { $set: { gCashBalance: gCashBalance } },
               { new: true }
          )

          res.status(200).send({
               success: true,
               message: "Cash Balance updated successfully.",
               balance: updatedBalance
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const BalanceController = {
     updateCashBalance,
     updateGCashBalance,
     getAllBalance
}

module.exports = BalanceController