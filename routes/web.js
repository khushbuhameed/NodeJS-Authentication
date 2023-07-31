const passport = require('passport');
const authController = require("../app/controller/authController")
const isLoggedIn = require('../app/middleware/guest')
function initRoutes(app){
app.get('/signin',authController().signin)
app.post('/signin',authController().postSignin)
app.get('/',authController().signup)
app.post('/',authController().postSignup)
app.post('/logout',authController().logout)
app.get('/reset',authController().reset)
app.post('/reset',authController().resetPassword)
app.get('/home',isLoggedIn,authController().home)
//google auth
app.get('/auth', passport.authenticate(
    'google',
    {scope:['profile','email']}),
);
app.get('/users/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:"/"}
),authController().home)
}
module.exports = initRoutes;