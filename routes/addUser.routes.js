const authController = require('../controllers/auth.controller');
const credentialsVerification=require('../middlewares/signInSignUp.mw')
const authmw=require('../middlewares/auth.mw')
module.exports=(app)=>{
    app.post("/todoApp/signUp",[credentialsVerification.verifyEmail,credentialsVerification.verifyUniqueEmail,credentialsVerification.passwordPresent],authController.signUp)
    app.post("/todoApp/signIn",[credentialsVerification.verifyEmail,credentialsVerification.passwordPresent],authController.signIn)
    app.get("/todoApp/signInCheck",[authmw.verifyToken],authController.signInCheck)
}