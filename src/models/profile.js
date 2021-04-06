const db = require("../db");

exports.lastTweets = (username, callback) => {
    db.query(`SELECT *, DATE_FORMAT(creation_date, "%d / %m / %Y") as date, tweets.id as tweet_id  FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE username = "${username}" ORDER BY tweets.creation_date desc LIMIT 20;`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.detail = (username, id, callback) => {
    db.query(`SELECT *, DATE_FORMAT(creation_date, "%d / %m / %Y") as date, tweets.id as tweet_id  FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE username = "${username}" AND tweets.id = ${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}