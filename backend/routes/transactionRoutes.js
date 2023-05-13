const express = require("express")
const TransactionController = require("../controllers/transactionController")

const router = express.Router()

router.post("/new-transaction", TransactionController.addTransaction)
router.get("/get-transaction/:id", TransactionController.getTransaction)
router.get("/get-all-transactions", TransactionController.getAllTransactions)
router.delete("/delete-transaction/:id", TransactionController.deleteTransaction)

router.get("/paginatedTransactions", TransactionController.pagination)

module.exports = router