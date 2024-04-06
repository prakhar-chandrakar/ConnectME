import express from "express";
import neo4j from "neo4j-driver";
import { Client } from "pg";
import config from "./config/serverConfig";

const app = express();
const PORT = config.port;

const client = new Client({
  user: config.postgres_user,
  host: config.postgres_host,
  database: config.postgres_db,
  password: config.postgres_pass,
  port: Number(config.postgres_port),
});

client.connect().then(() => {
  console.log("POSTGRES database connection eastablished")
});

async function main() {
  const URI: string = config.neo4j_uri!;
  const user: string = config.neo4j_user!;
  const password: string = config.neo4j_pass!;
  try {
    const driver = neo4j.driver(URI, neo4j.auth.basic(user, password));
    console.log("NEO4J database connection established");
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
}
main();

app.get("/", (req, res) => {
  res.send("Hello there, Welcome to ConnectMe Backend Server");
});

app.listen(PORT, () => {
  console.log("ConnectME server is running on PORT http://localhost:" + PORT);
});
