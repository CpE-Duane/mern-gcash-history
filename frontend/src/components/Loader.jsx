import React from 'react'
import loader from '../assets/loader.gif'

const Loader = () => {
     return (
          <>
               <div className="bg-dark vh-100 d-flex justify-content-center align-items-center">
                    <img src={loader} alt="" />
               </div>
          </>
     )
}

export default Loader