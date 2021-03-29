const db = require("../db");

exports.lastTweets = (id, callback) => {
    db.query(`SELECT * FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE tweets.user_id = ${id} ORDER BY tweets.id desc LIMIT 20;`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}