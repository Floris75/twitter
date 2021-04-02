const visitor = require("../models/visitor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "719a7fa2bb664547aa56cfd7cc30a3f3c890df7214774b929420dd3c68dbca7332a7df8c89a844b1b865621012dcdbed"
const maxage = Math.floor(Date.now() / 1000) + (60*60);

exports.login = async (request, response) => {
    const erreurs = await request.consumeFlash("warning");
    response.render("Login.ejs", {erreurs});
}

exports.signup = async (request, response) => {
    const erreurs = await request.consumeFlash("warning");
    response.render("Signup.ejs", {erreurs});
}

exports.createAccount = (request, response) => {
    const { first_name, last_name, username, password } = request.body;

    visitor.getByUsername(username, async (error, result) => {
        if (error) {
            response.send (error.message);
        }
        else if (result.length !== 0) {
            await request.flash("warning", "This user already exist");
            response.redirect("/signup");
        }
        else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, (error, hash) => {
                if (error) {
                    response.send(error.message);
                  }
                const newUser = {
                    first_name,
                    last_name,
                    username,
                    password: hash
                }
                visitor.createUser(newUser, request.body, (error, result) => {
                    if (error) {
                        response.send(error.message);
                      }
                    response.redirect("/login");
                })
            });
        }
    }); 
}

exports.authenticate = (request, response) => {
    const {username, password } = request.body;
    visitor.getByUsername(username, async (error, result) => {
        if (error) {
            response.send(error.message);
        }
        else if (result.length === 0) {
            await request.flash("warning", "This user doesn't exist");
            response.redirect("/login");
        }
        else {
            const hash = result[0].password;
            bcrypt.compare(password, hash, async (error, correct) => {
                if (error) {
                    response.send(error.message);
                }
                else if (!correct) {
                    await request.flash("warning", "Invalid Password");
                    response.redirect("/login");
                }
                else {
                    const user = {
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        username: result[0].username,
                        exp: maxage
                    }
                    jwt.sign(user, secret, (error, token) => {
                        if (error) {
                            response.send(error.message);
                        }
                        else {
                            request.user = {
                                first_name: result[0].first_name,
                                last_name: result[0].last_name,
                                username: result[0].username
                            };
                            response.cookie("authcookie", token, { maxAge: 3600000 });
                            return response.redirect("/");
                        }
                    });
                }
            });
        }
    });
}

