import axios from 'axios'
const serverURL = 'http://localhost:5000'

const addTransaction = (payload) => {
     return axios.post(`${serverURL}/api/transaction/new-transaction`, payload, {
          headers: {
               "Content-Type": "application/json",
          }
     })
}

const getAllTransactions = () => {
     return axios.get(`${serverURL}/api/transaction/get-all-transactions`)
}

const getTransaction = (id) => {
     return axios.get(`${serverURL}/api/transaction/get-transaction/${id}`)
}

const deleteTransaction = (id) => {
     return axios.delete(`${serverURL}/api/transaction/delete-transaction/${id}`)
}

const paginatedTransactions = (page, limit) => {
     return axios.get(`${serverURL}/api/transaction/paginatedTransactions?page=${page}&limit=${limit}`)
}

const TransactionService = {
     addTransaction,
     getAllTransactions,
     getTransaction,
     deleteTransaction,
     paginatedTransactions
}

export default TransactionService