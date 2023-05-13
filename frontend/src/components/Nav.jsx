import React from 'react'
import styled from 'styled-components'

const Nav = () => {
     return (
          <>
               <NavContainer className='d-flex align-items-center justify-content-center'>
                    <h2 className='text-center text-white'>GCash Transactions History</h2>
               </NavContainer>
          </>
     )
}

const NavContainer = styled.div`
     height: 8vh;
     background-color: #0b3cde;
     overflow: auto;

     h2 {
          letter-spacing: 1px;
     }
`

export default Nav