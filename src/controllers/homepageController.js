const { response } = require("express");
const homepage = require("../models/homepage");

exports.load = (request, response) => {
    homepage.lastTweets ((error, tweets) => {
        if (error) {
            response.send (error.message);
        }
        
        tweets = [
            {id:1, text: "juste un texte!", creation_date: "19/02/2021", user_id:1, username: "Bridou"},
            {id:1, text: "juste un texte 2!", creation_date: "19/03/2021", user_id:1, username: "Bridou"},
            {id:1, text: "juste un texte!", creation_date: "19/02/2021", user_id:2, username: "Dartagnan"},
            {id:1, text: "juste un texte 2!", creation_date: "19/03/2021", user_id:2, username: "Dartagnan"},
            {id:1, text: "juste un texte!", creation_date: "19/04/2021", user_id:3, username: "Tartanpion"}
        ];

        response.render("Homepage.ejs", { tweets });
    });
}
