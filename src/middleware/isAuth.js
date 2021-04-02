const jwt = require("jsonwebtoken");
const secret = "719a7fa2bb664547aa56cfd7cc30a3f3c890df7214774b929420dd3c68dbca7332a7df8c89a844b1b865621012dcdbed";

const isAuth = (request, response, next) => {
    const token = request.cookies.authcookie;
    if (!token) {
        next();
    }
    else {
        jwt.verify(token, secret, (error, user) => {
            if (error) {
                response.send(error.message);
            }
            else {
                const {first_name, last_name, username, exp} = user;
                if (Date.now()/1000 >= exp) {
                    const erreur = {
                        message: "Try to reconnect you"
                    }
                    response.render("Login.ejs", erreur);
                }
                
                request.user = {first_name, last_name, username};
                next();
            }
        });
    }
}
    
module.exports = isAuth;