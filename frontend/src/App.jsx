import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import GcashTransactionHistory from './pages/GcashTransactionHistory'
import New from './components/New'
import Nav from './components/Nav'

const App = () => {
     return (
          <>
               <ToastContainer />
               <Nav />
               <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/gcash-transaction-history' element={<GcashTransactionHistory />} />
                    <Route path='/new' element={<New />} />
               </Routes>
          </>
     )
}


export default App