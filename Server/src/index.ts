import express from "express";
import { Client } from "pg";

const app = express();
const PORT: number = 3000;

const client = new Client({
  user: "admin",
  host: "localhost",
  database: "test_db",
  password: "prakhar",
  port: 5433,
});

client.connect().then(() => {
  client.query("SELECT NOW()", (err, res) => {
    console.log(res.rows);
    client.end();
  });
});

app.get("/", (req, res) => {
  res.send("Hello there, Welcome to ConnectMe Backend Server");
});

app.listen(PORT, () => {
  console.log("ConnectME server is running on PORT http://localhost:" + PORT);
});
