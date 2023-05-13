import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import BalanceService from '../service/BalanceService'
import Toast from './../toast/Toast';
import Loader from './../components/Loader';
import TransactionService from '../service/TransactionService'
import ReactPaginate from 'react-paginate'

const GcashTransactionHistory = () => {

     const navigate = useNavigate()
     const [loading, setLoading] = useState(false)
     const [transactions, setTransactions] = useState([])
     const [cashBalance, setCashBalance] = useState({});
     const [GCashBalance, setGCashBalance] = useState({});
     const [formattedCash, setFormattedCash] = useState('')
     const [formattedGCash, setFormattedGCash] = useState('')
     const [selectedTransaction, setSelectedTransaction] = useState({})
     const [totalProfit, setTotalProfit] = useState(0)
     const page = useRef()
     const [limit, setLimit] = useState(5)
     const [pageCount, setPageCount] = useState(1)
     const [paginatedTransactions, setPaginatedTransactions] = useState([])


     useEffect(() => {
          if (!localStorage.getItem(("user"))) {
               navigate("/")
          }
     }, [navigate])

     const getAllTransactions = async () => {
          try {
               setLoading(true)
               const { data } = await TransactionService.getAllTransactions()
               if (data.success) {
                    setTransactions(data.transactions)
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)

          } finally {
               setLoading(false)
          }
     }

     const getAllBalance = async () => {
          try {
               setLoading(true)
               const { data } = await BalanceService.getAllBalance()
               if (data.success) {
                    setCashBalance(data.balances[0]);
                    setGCashBalance(data.balances[1])

               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          getAllBalance()
     }, [])

     useEffect(() => {
          getAllTransactions()
     }, [totalProfit])

     useEffect(() => {
          let profit = 0;
          transactions.forEach(t => {
               profit += t.profit;
          });
          setTotalProfit(profit);
     }, [transactions, paginatedTransactions]);

     useEffect(() => {
          const formatCash = Number(cashBalance.cashBalance).toLocaleString('en-US', {
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
          })

          const formatGCash = Number(GCashBalance.gCashBalance).toLocaleString('en-US', {
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
          })

          setFormattedCash(formatCash)
          setFormattedGCash(formatGCash)

     }, [cashBalance, GCashBalance])

     const deleteTransaction = async () => {
          try {
               setLoading(true)
               const cashRemovePayload = {
                    id: cashBalance._id,
                    cashBalance: selectedTransaction.cash > selectedTransaction.gcash
                         ? cashBalance.cashBalance - selectedTransaction.cash
                         : cashBalance.cashBalance + selectedTransaction.cash
               }

               const gcashRemovepayload = {
                    id: GCashBalance._id,
                    gCashBalance: selectedTransaction.gcash > selectedTransaction.cash
                         ? GCashBalance.gCashBalance - selectedTransaction.gcash
                         : GCashBalance.gCashBalance + selectedTransaction.gcash
               }

               await BalanceService.updateCashBalance(cashRemovePayload)
               await BalanceService.updateGCashBalance(gcashRemovepayload)

               const { data } = await TransactionService.deleteTransaction(selectedTransaction._id)
               if (data.success) {
                    Toast.successMsg(data.message)
                    getPaginatedTransactions()
                    getAllTransactions()
                    getAllBalance()
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     const handlePageClick = async (e) => {
          page.current = e.selected + 1
          getPaginatedTransactions()
     }

     const getPaginatedTransactions = async () => {
          try {
               const { data } = await TransactionService.paginatedTransactions(page.current, limit)
               if (data.success) {
                    setPageCount(data.results.pageCount)
                    setPaginatedTransactions(data.results.result)
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)

          }
     }

     useEffect(() => {
          page.current = 1
          getPaginatedTransactions()
     }, [])

     const changeLimit = () => {
          getPaginatedTransactions()
     }

     return (
          <>
               {
                    loading
                         ? <Loader />
                         : (
                              <GcashTransactionHistoryContainer className=' p-5'>
                                   <div className='bal d-flex justify-content-between' >
                                        <div>
                                             <h2 className='fw-bold'>CASH BALANCE</h2>
                                             <div className='d-flex justify-content-between align-items-center'>
                                                  <h3> <i className="fa-solid fa-peso-sign"></i>{formattedCash}</h3>
                                             </div>
                                        </div>
                                        <div>
                                             <h2 className='fw-bold'>GCASH BALANCE</h2>
                                             <div className='d-flex justify-content-between align-items-center float-end'>
                                                  <h3> <i className="fa-solid fa-peso-sign"></i>{formattedGCash}</h3>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Transaction Table */}
                                   <div className='mt-5'>
                                        <div className='d-flex justify-content-between align-items-center mb-3'>
                                             {
                                                  paginatedTransactions.length > 0 &&
                                                  <>
                                                       <div className='d-flex justify-content-between'>
                                                            <input type="number"
                                                                 className='text-center border-light '
                                                                 onChange={(e) => setLimit(e.target.value)}
                                                                 value={limit}
                                                                 min={1}
                                                                 max={transactions.length} />
                                                            <button className='btn btn-dark ms-2' onClick={changeLimit}>Set Limit</button>
                                                       </div>
                                                       <div>
                                                            <h5>No. of transactions: {transactions.length} transactions</h5>
                                                       </div>
                                                  </>
                                             }
                                             <Link to="/new" className={`btn btn-primary fw-bold ${paginatedTransactions.length === 0 && "ms-auto"}`}><i className="fa fa-plus me-2"></i>New Transaction</Link>
                                        </div>
                                        {
                                             transactions.length > 0 &&
                                             <>
                                                  <table className='table table-striped table-hover'>
                                                       <thead className='border-0 border-bottom border-dark border-2 text-center'>
                                                            <tr>
                                                                 <th>ID</th>
                                                                 <th>TYPE</th>
                                                                 <th>AMOUNT</th>
                                                                 <th>PAYMENT TYPE</th>
                                                                 <th>CASH</th>
                                                                 <th>GCASH</th>
                                                                 <th>PROFIT</th>
                                                                 <th>ACTIONS</th>
                                                            </tr>
                                                       </thead>
                                                       <tbody className='text-center'>
                                                            {
                                                                 paginatedTransactions?.map((transaction, index) => {
                                                                      return (
                                                                           <>
                                                                                <tr key={transaction._id} className='align-middle'>
                                                                                     <td>{page.current === 1 ? index + 1 : (limit * (page.current - 1)) + (index + 1)}</td>
                                                                                     <td>{transaction.transactionType}</td>
                                                                                     <td>
                                                                                          <i className="fa-solid fa-peso-sign me-2"></i>
                                                                                          {Number(transaction.amount).toLocaleString('en-US', {
                                                                                               minimumFractionDigits: 0,
                                                                                               maximumFractionDigits: 0
                                                                                          })}
                                                                                     </td>
                                                                                     <td>{transaction.profitType}</td>
                                                                                     <td><span>{transaction.cash > transaction.gcash ? "+" : "-"}</span> {transaction.cash} </td>
                                                                                     <td><span>{transaction.gcash > transaction.cash ? "+" : "-"} </span>{transaction.gcash}</td>
                                                                                     <td>
                                                                                          <i className="fa-solid fa-peso-sign me-2"></i>
                                                                                          {Number(transaction.profit).toLocaleString('en-US', {
                                                                                               minimumFractionDigits: 0,
                                                                                               maximumFractionDigits: 0
                                                                                          })}
                                                                                     </td>
                                                                                     <td>
                                                                                          <button className="btn btn-danger"
                                                                                               data-bs-toggle="modal"
                                                                                               data-bs-target="#exampleModal"
                                                                                               onClick={() => setSelectedTransaction(transaction)}>
                                                                                               <i className="fa fa-trash"></i>
                                                                                          </button>
                                                                                     </td>

                                                                                </tr>

                                                                           </>

                                                                      )
                                                                 })
                                                            }
                                                            <tr className='text-end'>
                                                                 <td className='fw-bold text-center'>Total Profit :</td>
                                                                 <td colSpan={5}  ></td>
                                                                 <td className='text-center'>
                                                                      <i className="fa-solid fa-peso-sign p-0 me-2"></i>
                                                                      {Number(totalProfit).toLocaleString('en-US', {
                                                                           minimumFractionDigits: 0,
                                                                           maximumFractionDigits: 0
                                                                      })}
                                                                 </td>
                                                                 <td></td>
                                                            </tr>
                                                       </tbody>
                                                  </table>
                                                  <ReactPaginate
                                                       breakLabel="..."
                                                       nextLabel="NEXT >"
                                                       onPageChange={handlePageClick}
                                                       pageRangeDisplayed={5}
                                                       pageCount={pageCount}
                                                       previousLabel="< PREVIOUS"
                                                       renderOnZeroPageCount={null}
                                                       marginPagesDisplayed={2}
                                                       containerClassName="pagination justify-content-center"
                                                       pageClassName="page-item"
                                                       pageLinkClassName="page-link"
                                                       previousClassName="page-item"
                                                       previousLinkClassName="page-link"
                                                       nextClassName="page-item"
                                                       nextLinkClassName="page-link"
                                                       activeClassName="active"
                                                       forcePage={page.current - 1}
                                                  />
                                             </>

                                        }

                                   </div>

                                   {/* Delete Modal */}
                                   <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                             <div className="modal-content">
                                                  <div className="modal-header">
                                                       <h5 className="modal-title" id="exampleModalLabel">Delete Transaction</h5>
                                                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                  </div>
                                                  <div className="modal-body">
                                                       Are you sure do you want to delete this transaction?
                                                  </div>
                                                  <div className="modal-footer">
                                                       <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                            Cancel
                                                       </button>
                                                       <button type="button" className="btn btn-primary" onClick={deleteTransaction} data-bs-dismiss="modal">
                                                            Delete
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </GcashTransactionHistoryContainer>
                         )
               }
          </>
     )
}

const GcashTransactionHistoryContainer = styled.div`
     overflow: auto;
     height: 92vh;
     .bal {
          width: auto;
     }
`

export default GcashTransactionHistory