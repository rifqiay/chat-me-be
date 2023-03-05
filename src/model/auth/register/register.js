const db = require("../../../config/db");

const create = (data) => {
  const { id, name, email, passwordHash, isVerified, token } = data;
  return db.query(
    `INSERT INTO users(id,name, email, password, is_verified, token) VALUES('${id}','${name}', '${email}', '${passwordHash}', ${isVerified}, '${token}')`
  );
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findByToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE token='${token}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const verifyingEmail = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET token= null, is_verified=true WHERE token ='${token}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  create,
  findByEmail,
  findByToken,
  verifyingEmail,
};
