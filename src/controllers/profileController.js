const profile = require("../models/profile");

exports.load = (request, response) => {
    const { username } = request.params;
    if (request.user != undefined) {
        if (username === request.user.username) {
            response.redirect("/myAccount");
        }
    }
    profile.lastTweets (username, (error, tweets) => {
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
        const owner = false;
        const update = false;
        response.render("Profile.ejs", { tweets, statut, owner, update, user: request.user });
    });
}

exports.tweetDetail = (request, response) => {
    const { username, id } = request.params;
    if (request.user != undefined) {
        if (username === request.user.username) {
            response.redirect(`/myAccount/${id}`);
        }
    }
    profile.detail (username, id, (error, tweets) => {
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
        const owner = false;
        const update = false;
        response.render("Profile.ejs", { tweets, statut, owner, update, user: request.user });
    });
}