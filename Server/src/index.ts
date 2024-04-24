import express, { Response } from "express";
import client from "./db/DB_setup/postgresSetup";
import config from "./config/serverConfig";
import router from "./routes/userRoutes";
import bodyParser from "body-parser";
import Neo4j from "./db/DB_setup/neo4jSetup";
import createTables from "./db/createTable/table";

const app = express();
const PORT = config.port;

// createTables(); // to create tables

app.use(bodyParser.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello there, Welcome to ConnectMe Backend Server");
});

client.connect().then(() => {
  console.log("-> NEON DB(postgres) database connection eastablished \n");
});
Neo4j();

app.listen(PORT, () => {
  console.log("-> ConnectME server is running on PORT http://localhost:" + PORT);
});
