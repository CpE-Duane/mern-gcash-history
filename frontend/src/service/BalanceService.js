import axios from 'axios'

const serverURL = 'https://gcash-api.onrender.com'

const updateCashBalance = (payload) => {
     return axios.put(`${serverURL}/api/balance/update-cash-balance`, payload)
}

const updateGCashBalance = (payload) => {
     return axios.put(`${serverURL}/api/balance/update-gcash-balance`, payload)
}

const getCashBalance = (id) => {
     return axios.get(`${serverURL}/api/balance/get-cash-balance/${id}`)
}

const getAllBalance = () => {
     return axios.get(`${serverURL}/api/balance/get-all-balance`)
}



const BalanceService = {
     updateCashBalance,
     getAllBalance,
     getCashBalance,
     updateGCashBalance
}

export default BalanceService