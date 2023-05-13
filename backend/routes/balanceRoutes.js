const express = require('express')
const BalanceController = require('../controllers/balanceController')


const router = express.Router()

// router.get("/get-cash-balance/:id", BalanceController.getCashBalance)
router.get("/get-all-balance", BalanceController.getAllBalance)
router.put("/update-cash-balance", BalanceController.updateCashBalance)
router.put("/update-gcash-balance", BalanceController.updateGCashBalance)

module.exports = router