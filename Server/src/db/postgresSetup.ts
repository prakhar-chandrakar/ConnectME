import { Client } from "pg";
import config from "../config/serverConfig";

const client = new Client({
  user: config.postgres_user,
  host: config.postgres_host,
  database: config.postgres_db,
  password: config.postgres_pass,
  port: Number(config.postgres_port),
});

export default  client;
