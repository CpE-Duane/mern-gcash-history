import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader';
import Toast from './../toast/Toast';
import TransactionService from '../service/TransactionService';
import BalanceService from '../service/BalanceService';

const New = () => {

     const navigate = useNavigate()
     const [loading, setLoading] = useState(false)
     const [balances, setBalances] = useState([])
     const [transactForm, setTransactForm] = useState({
          transactionType: '',
          amount: undefined,
          profit: undefined,
          profitType: ''
     })

     useEffect(() => {
          const getAllBalance = async () => {
               try {
                    setLoading(true)
                    const { data } = await BalanceService.getAllBalance()
                    if (data.success) {
                         setBalances(data.balances)
                    } else {
                         Toast.errorMsg(data.message)
                    }

               } catch (error) {
                    Toast.errorMsg(error.response.data.message)
               } finally {
                    setLoading(false)
               }
          }

          getAllBalance()
     }, [])

     const addTransaction = async (e) => {
          e.preventDefault()

          const payload = {
               transactionType: transactForm.transactionType,
               amount: Number(transactForm.amount),
               profit: Number(transactForm.profit),
               profitType: transactForm.profitType,
               cash: transactForm.transactionType === "LOAD" || transactForm.transactionType === "CASHIN" || transactForm.transactionType === "PAYBILLS"
                    ? transactForm.profitType === "CASH" ? Number(transactForm.amount) + Number(transactForm.profit) : Number(transactForm.amount)
                    : transactForm.profitType === "CASH" ? Number(transactForm.amount) - Number(transactForm.profit) : Number(transactForm.amount),

               gcash: transactForm.transactionType === "CASHOUT"
                    ? transactForm.profitType === "GCASH" ? Number(transactForm.amount) + Number(transactForm.profit) : Number(transactForm.amount)
                    : transactForm.profitType === "GCASH" ? Number(transactForm.amount) - Number(transactForm.profit) : Number(transactForm.amount)
          }

          try {
               setLoading(true)
               if (transactForm.transactionType === "CASHIN" || transactForm.transactionType === "LOAD" || transactForm.transactionType === "PAYBILLS") {
                    const cashBalancePayload = {
                         id: balances[0]._id,
                         cashBalance: transactForm.profitType === "CASH" ? balances[0].cashBalance + Number(transactForm.amount) + Number(transactForm.profit) : balances[0].cashBalance + Number(transactForm.amount)
                    }

                    const GCashBalancePayload = {
                         id: balances[1]._id,
                         gCashBalance: transactForm.profitType === "GCASH" ? balances[1].gCashBalance - Number(transactForm.amount) + Number(transactForm.profit) : balances[1].gCashBalance - Number(transactForm.amount)
                    }

                    await BalanceService.updateCashBalance(cashBalancePayload)
                    await BalanceService.updateGCashBalance(GCashBalancePayload)

               } else {
                    const cashBalancePayload = {
                         id: balances[0]._id,
                         cashBalance: transactForm.profitType === "CASH" ? balances[0].cashBalance - Number(transactForm.amount) + Number(transactForm.profit) : balances[0].cashBalance - Number(transactForm.amount)
                    }

                    const GCashBalancePayload = {
                         id: balances[1]._id,
                         gCashBalance: transactForm.profitType === "GCASH" ? balances[1].gCashBalance + Number(transactForm.amount) + Number(transactForm.profit) : balances[1].gCashBalance + Number(transactForm.amount)
                    }

                    await BalanceService.updateCashBalance(cashBalancePayload)
                    await BalanceService.updateGCashBalance(GCashBalancePayload)
               }

               const { data } = await TransactionService.addTransaction(payload)
               if (data.success) {

                    Toast.successMsg(data.message)
                    navigate("/gcash-transaction-history")
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     const handleChange = (e) => {
          setTransactForm({
               ...transactForm,
               [e.target.name]: e.target.value
          })
     }

     return (
          <>
               {
                    loading
                         ? <Loader />
                         : (
                              <NewContainer className='mt-5'>
                                   <div className="container-fluid">
                                        <div className="row d-flex justify-content-center">
                                             <div className="col-3">
                                                  <div className="card border-0 rounded-0 shadow-sm">
                                                       <div className="card-header">
                                                            <h2 className='text-primary text-center py-3'>ADD TRANSACTION</h2>
                                                       </div>
                                                       <div className="card-body">
                                                            <form>
                                                                 <div className='mb-3'>
                                                                      Transaction Type <span className='text-danger'>*</span>
                                                                      <select className='form-control' required
                                                                           name='transactionType'
                                                                           value={transactForm.transactionType}
                                                                           onChange={handleChange}>
                                                                           <option value="">--Please choose an option--</option>
                                                                           <option value="LOAD">LOAD</option>
                                                                           <option value="CASHIN">CASHIN</option>
                                                                           <option value="CASHOUT">CASHOUT</option>
                                                                           <option value="PAYBILLS">PAYBILLS</option>
                                                                      </select>
                                                                 </div>
                                                                 <div className='mb-3'>
                                                                      Amount <span className='text-danger'>*</span>
                                                                      <input type="number"
                                                                           className='form-control'
                                                                           placeholder='Enter amount'
                                                                           name='amount'
                                                                           value={transactForm.amount}
                                                                           onChange={handleChange}
                                                                           required />
                                                                 </div>
                                                                 <div className='mb-3'>
                                                                      Profit <span className='text-danger'>*</span>
                                                                      <input type="number"
                                                                           className='form-control'
                                                                           placeholder='Enter profit'
                                                                           name='profit'
                                                                           value={transactForm.profit}
                                                                           onChange={handleChange}
                                                                           required />
                                                                 </div>
                                                                 <div className='mb-4'>
                                                                      Profit Type <span className='text-danger'>*</span>
                                                                      <select className='form-control' required
                                                                           name='profitType'
                                                                           value={transactForm.profitType}
                                                                           onChange={handleChange}>
                                                                           <option value="">--Please choose an option--</option>
                                                                           <option value="CASH">CASH</option>
                                                                           <option value="GCASH">GCASH</option>
                                                                      </select>
                                                                 </div>
                                                                 <div className='row'>
                                                                      <div className="col-6 d-grid">
                                                                           <Link to="/gcash-transaction-history" className="btn btn-danger rounded-0">Cancel</Link>
                                                                      </div>
                                                                      <div className="col-6 d-grid">
                                                                           <button className="btn btn-primary rounded-0" onClick={addTransaction}>New</button>
                                                                      </div>
                                                                 </div>
                                                            </form>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </NewContainer>
                         )
               }
          </>
     )
}

const NewContainer = styled.div`
     
`

export default New