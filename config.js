//@ts-check
const dotenv = require("dotenv");
const path = require("path");

let envFile = "development.env";
const env = process.env.NODE_ENV || "development";

if (process.env.ENV !== undefined) {
    envFile = env + ".env";
}

dotenv.config({
    path: "environment/" + envFile,
});

class Config {
  constructor() {
    this.env = env;
    this.root = __dirname;
    this.rootPath = process.env.ROOT_PATH || "/";
    this.port = Number(process.env.PORT) || 8080;
  }
}

module.exports = new Config();
