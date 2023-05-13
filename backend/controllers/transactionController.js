const Transaction = require("../models/transactionModel")

const addTransaction = async (req, res) => {
     try {
          const { transactionType, amount, profit, profitType, cash, gcash } = req.body

          if (!transactionType || !amount || !profit || !profitType || !cash || !gcash) {
               return res.status(400).send({
                    success: false,
                    message: "All fields are required."
               })
          }

          const transaction = await Transaction.create({
               transactionType,
               amount,
               profit,
               profitType,
               cash,
               gcash
          })

          if (amount <= 0) {
               return res.status(400).send({
                    success: false,
                    message: "Amount invalid."
               })
          }

          if (profit <= 0) {
               return res.status(400).send({
                    success: false,
                    message: "Profit invalid."
               })
          }

          return res.status(201).send({
               success: true,
               message: "Transaction added successfully.",
               transaction: transaction
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const getAllTransactions = async (req, res) => {
     try {

          const transactions = await Transaction.find({})

          if (!transactions) {
               return res.status(400).send({
                    success: false,
                    message: "Transactions not found."
               })
          }

          res.status(200).send({
               success: true,
               message: "Transactions fetch successfully.",
               transactions: transactions
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const getTransaction = async (req, res) => {
     try {
          const id = req.params.id
          const transaction = await Transaction.findById(id)

          if (!transaction) {
               return res.status(404).send({
                    success: false,
                    message: 'Transaction not found'
               });
          }

          res.status(200).send({
               success: true,
               message: 'Transaction fetch successfully',
               transaction
          });

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const deleteTransaction = async (req, res) => {
     try {
          const id = req.params.id

          const transaction = await Transaction.findById(id)

          if (!transaction) {
               return res.status(404).send({
                    success: false,
                    message: "Transaction not found."
               })
          }

          await Transaction.deleteOne({ _id: id })

          res.status(200).send({
               success: true,
               message: "Transaction deleted successfully."
          })



     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}

const pagination = async (req, res) => {
     const allTransactions = await Transaction.find({})
     const page = parseInt(req.query.page)
     const limit = parseInt(req.query.limit)

     const startIndex = (page - 1) * limit
     const lastIndex = (page) * limit

     const results = {}
     results.numberOfTransactions = allTransactions.length
     results.pageCount = Math.ceil(allTransactions.length / limit)

     if (lastIndex < allTransactions.length) {
          results.next = {
               page: page + 1,
               limit: limit
          }
     }

     if (startIndex > 0) {
          results.prev = {
               page: page - 1,
               limit: limit
          }
     }

     results.result = allTransactions.slice(startIndex, lastIndex)

     res.status(200).send({
          success: true,
          results
     })
}

const TransactionController = {
     addTransaction,
     getAllTransactions,
     getTransaction,
     deleteTransaction,
     pagination
}



module.exports = TransactionController