import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import AuthService from '../service/AuthService'
import Toast from '../toast/Toast'
import Loader from '../components/Loader'


const Login = () => {

     const navigate = useNavigate()
     const [showPassword, setShowPassword] = useState(false)
     const [password, setPassword] = useState("")
     const [loading, setLoading] = useState(false)

     async function handleSubmit(e) {
          e.preventDefault()
          const payload = {
               password: password
          }
          try {
               setLoading(true)
               const res = await AuthService.signIn(payload)
               if (res.data.success) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    Toast.successMsg(res.data.message)
                    navigate("/gcash-transaction-history")
               } else {
                    Toast.errorMsg(res.data.message)
               }
          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          if (localStorage.getItem("user")) {
               navigate("/gcash-transaction-history")
          }
     }, [navigate])

     return (
          <>
               {
                    loading
                         ? <Loader />
                         : (
                              <LoginContainer className='container-fluid bg-light'>
                                   <div className="row h-100 d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xxl-3">
                                             <div className="card border-0 shadow-lg">
                                                  <div className="card-body">
                                                       <form>
                                                            <div className='mb-3'>
                                                                 <span className='text-secondary fw-bold fst-italic'>Password </span><span className='text-danger'>*</span>
                                                                 <div className='form-control d-flex align-items-center mt-2'>
                                                                      <div className='h-100'>
                                                                           <i className="fa fa-lock text-primary"></i>
                                                                      </div>
                                                                      <input type={`${showPassword ? "text" : "password"}`}
                                                                           placeholder='********'
                                                                           onChange={(e) => setPassword(e.target.value)}
                                                                           value={password}
                                                                           className='border-0 w-100 ps-3' />
                                                                      <i className={`fa text-primary ${!password && "d-none"} ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>

                                                                 </div>
                                                            </div>
                                                            <div className='d-grid text-center'>
                                                                 <button className='btn-login btn btn-default text-white fw-bold'
                                                                      onClick={handleSubmit}>
                                                                      LOGIN
                                                                 </button>
                                                            </div>
                                                       </form>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </LoginContainer>
                         )
               }
          </>
     )
}

const LoginContainer = styled.div`
     height: 100vh;

     .btn-login {
          background-color: #fc8105;
          letter-spacing: 1px !important;

          &:hover {
               background-color: blue;
               color: white;
          }
     }

     input:focus {
          outline: none;
     }

     a {
          text-decoration: none;
     }

     i {
          cursor: pointer;
     }
`

export default Login