const pool = require("../db");

const createUser = (data, callback) => {
  pool.query(
    `insert into users values ('${data.id}', '${data.username}', '${data.hash}', '${data.salt}');`,
    (err, res) => {
      if (err) {
        console.error("error in inserting new user " + err);
        callback(err);
      } else {
        console.log("creating user in database");
        callback(res.rows);
      }
    }
  );
};

const getUser = (username, callback) => {
  pool.query(
    `select * from users where username='${username}' limit 1;`,
    (err, res) => {
      if (err) {
        console.error("error in getting new user " + err);
        callback(err);
      } else {
        console.log("getting user from database");
        callback(res.rows[0]);
      }
    }
  );
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
};
