const { Client } = require("pg");
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client.connect((error) => {
  if (error) console.log(error);
  console.log("Database connected");
});

module.exports = client;
