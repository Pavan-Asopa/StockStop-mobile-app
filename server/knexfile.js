const DB_PW = process.env.DB_PW;
module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "stockstopdb",
    user: "root",
    password: DB_PW,
  },
};
