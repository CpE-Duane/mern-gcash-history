import axios from 'axios'

const signIn = (payload) => {
     return axios.post('https://gcash-api.onrender.com/api/auth/signin', payload, {
          headers: {
               "Content-Type": "application/json",
          }
     })
}

const AuthService = {
     signIn,
}

export default AuthService