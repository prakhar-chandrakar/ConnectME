import express, { Response } from "express";
import client from "./db/postgresSetup";
import config from "./config/serverConfig";
import router from "./routes/userRoutes";
import bodyParser from "body-parser";
import Neo4j from "./db/neo4jSetup";

const app = express();

app.use(bodyParser.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello there, Welcome to ConnectMe Backend Server");
});

const PORT = config.port;

client.connect().then(() => {
  console.log("-> POSTGRES database connection eastablished");
  console.log("");
});

async function createTable() {
  const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
  )`;
  await client.query(createUserTable);
}

createTable();
Neo4j();

app.listen(PORT, () => {
  console.log("-> ConnectME server is running on PORT http://localhost:" + PORT);
});
