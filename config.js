//@ts-check
const dotenv = require("dotenv");
const path = require("path");

let envFile = "development.env";
const env = process.env.NODE_ENV || "development";

if (process.env.ENV !== undefined) {
    envFile = env + ".env";
}

dotenv.config({
    path: "environments/" + envFile,
});


class Config {
  constructor() {
    this.env = env;
    this.root = __dirname;
    this.rootPath = process.env.ROOT_PATH || "/";
    this.port = Number(process.env.PORT) || 8080;
    this.dbHost = process.env.DB_HOST;
    this.dbUser = process.env.DB_USER;
    this.dbPassword = process.env.DB_PWD;
    this.dbName = process.env.DB_NAME;
  }
}

module.exports = new Config();
