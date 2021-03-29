const { response } = require("express");
const profile = require("../models/profile");

exports.load = (request, response) => {
    const { id } = request.params;
    profile.lastTweets (id, (error, tweets) => {
        if (error) {
            response.send (error.message);
        }
        
        tweets = [
            {id:1, text: "juste un texte!", creation_date: "19/02/2021", user_id:1, username: "Bridou"},
            {id:1, text: "juste un texte 2!", creation_date: "19/03/2021", user_id:1, username: "Bridou"},
        ];

        response.render("Profile.ejs", { tweets });
    });
}