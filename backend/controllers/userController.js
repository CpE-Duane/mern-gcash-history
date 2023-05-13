const signIn = async (req, res) => {
     try {
          const { password } = req.body

          if (!password) {
               return res.status(400).send({
                    success: false,
                    message: "Please enter password."
               })
          }

          if (password !== process.env.PASSWORD_USER && password !== process.env.PASSWORD_ADMIN) {
               return res.status(400).send({
                    success: false,
                    message: "Password is not registered."
               })
          }


          if (password === process.env.PASSWORD_ADMIN) {
               res.status(200).send({
                    success: true,
                    message: "Admin login successfully.",
                    admin: true
               })
          }

          if (password === process.env.PASSWORD_USER) {
               res.status(200).send({
                    success: true,
                    message: "User login successfully.",
                    admin: false
               })
          }

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Server Error."
          })
     }
}


const UserController = {
     signIn
}

module.exports = UserController