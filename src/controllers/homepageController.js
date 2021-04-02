const homepage = require("../models/homepage");

exports.load = (request, response) => {
    homepage.lastTweets ((error, tweets) => {
        if (error) {
            response.send (error.message);
        }
        const cookie = request.cookies.authcookie;
        let statut;
        if (cookie) {
            statut = "user";
        }
        else {
            statut = "visitor";
        }
        response.render("Homepage.ejs", { tweets, statut, user: request.user });
    });
}
