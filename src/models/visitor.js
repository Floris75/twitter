const db = require("../db");

exports.getByUsername = (username, callback) => {
    db.query(`SELECT * FROM users WHERE users.username = "${username}";`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }
      
        callback(null, result);
        }
    );
}

exports.createUser = (user, user_infos, callback) => {
    db.query(`INSERT INTO users (first_name, last_name, date_of_birth, email, password, phone_number, city, username) VALUES ("${user.first_name}", "${user.last_name}", "${user_infos.birthday}", "${user_infos.email}", "${user.password}", ${user_infos.telephone}, "${user_infos.city}", "${user.username}" )`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }
      
        callback(null, result);
    });
}
