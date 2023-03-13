const db = require("../../config/db");

const getuser = (id) => {
  return db.query(
    `SELECT users.id, users.name, users.username, users.bio, users.photo, users.phone FROM users WHERE id='${id}'`
  );
};

const editName = ({ id, name }) => {
  return db.query(`UPDATE users SET name='${name}' WHERE id='${id}';`);
};

const editPhone = ({ id, phone }) => {
  return db.query(`UPDATE users SET phone='${phone}' WHERE id='${id}'`);
};

const editUsername = ({ id, username }) => {
  return db.query(`UPDATE users SET username='${username}' WHERE id='${id}'`);
};

const editBio = ({ id, bio }) => {
  return db.query(`UPDATE users SET bio='${bio}' WHERE id='${id}'`);
};

const editPhoto = (data) => {
  const { id, photo } = data;
  return db.query(`UPDATE users SET photo='${photo}' WHERE id='${id}'`);
};

const getFriends = (id) => {
  return db.query(`SELECT * FROM users WHERE id <> '${id}'`);
};

module.exports = {
  editName,
  getuser,
  editPhone,
  editUsername,
  editBio,
  editPhoto,
  getFriends,
};
