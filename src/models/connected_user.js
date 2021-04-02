const db = require("../db");

exports.myTweets = (username, callback) => {
    db.query(`SELECT *, DATE_FORMAT(creation_date, "%d %m %Y") as date, tweets.id as tweet_id FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE username = "${username}" ORDER BY tweets.creation_date desc LIMIT 20;`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.detail = (username, id, callback) => {
    db.query(`SELECT *, DATE_FORMAT(creation_date, "%d %m %Y") as date FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE username = "${username}" AND tweets.id = ${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.delete = (id, callback) => {
    db.query(`DELETE FROM tweets WHERE id = ${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.update = (id, info, callback) => {
    db.query(`UPDATE tweets SET text = "${info.text}" WHERE id = ${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.tweet = (id, text, callback) => {
    db.query(`INSERT INTO tweets(text, creation_date, user_id) VALUES ("${text}", now(), ${id});`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}