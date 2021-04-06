const connected_user = require("../models/connected_user");
const visitor = require('../models/visitor');

exports.logout = (request, response) => {
    response.clearCookie("authcookie");
    response.redirect("/");
}


exports.load = (request, response) => {
    const { username } = request.user;
    connected_user.myTweets (username, (error, tweets) => {
        if (error) {
            response.send (error.message);
        }
        const statut = "user";
        const owner = true;
        const update = false;
        response.render("Profile.ejs", { tweets, statut, owner, update, user: request.user });
    });
}

exports.tweetDetail = (request, response) => {
    const { id } = request.params;
    const { username } = request.user;
    connected_user.detail (username, id, (error, tweets) => {
        if (error) {
            response.send (error.message);
        }
        const statut = "user";
        const owner = true;
        const update = false;
        response.render("Profile.ejs", { tweets, statut, owner, update, user: request.user });
    });
}

exports.deleteTweet = (request, response) => {
    const { id } = request.params;
    connected_user.delete (id, (error, result) => {
        if (error) {
            response.send (error.message);
        }
        response.redirect("/myAccount");
    });
}

exports.tweetModify = (request, response) => {
    const { id } = request.params;
    const { username } = request.user;
    connected_user.detail (username, id, (error, tweets) => {
        if (error) {
            response.send (error.message);
        }
        const statut = "user";
        const owner = true;
        const update = true;
        response.render("Profile.ejs", { tweets, statut, owner, update, user: request.user });
    });
}

exports.tweetUpdate = (request, response) => {
    const { id } = request.params;
    connected_user.update (id, request.body, (error, result) => {
        if (error) {
            response.send (error.message);
        }
        response.redirect(`/myAccount`)
    });
}

exports.tweeter = (request, response) => {
    const { username } = request.user;
    const { text } = request.body
    let id;
    visitor.getByUsername(username, (error, result) => {
        if (error) {
            response.send (error.message);
        }
        else {
            id = result[0].id;
            connected_user.tweet (id, text, (error, result) => {
                if (error) {
                    response.send (error.message);
                }
                response.redirect("/");
        }
        )};
    })
}