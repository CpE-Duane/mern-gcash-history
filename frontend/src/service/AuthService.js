import axios from 'axios'

const signIn = (payload) => {
     return axios.post('http://localhost:5000/api/auth/signin', payload, {
          headers: {
               "Content-Type": "application/json",
          }
     })
}

const AuthService = {
     signIn,
}

export default AuthService