const db = require("../db");

exports.lastTweets = (callback) => {
    db.query(`SELECT *, DATE_FORMAT(creation_date, "%d / %m / %Y") as date FROM tweets INNER JOIN users ON users.id = tweets.user_id ORDER BY tweets.creation_date desc LIMIT 20;`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}