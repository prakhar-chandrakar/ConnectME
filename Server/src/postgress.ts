import { Client } from "pg";

const client = new Client({
  user: "prakhar",
  host: "localhost",
  database: "test_db",
  password: "prakhar",
  port: 5432,
});

client.connect().then(() => {
  client.query("SELECT NOW()", (err, res) => {
    console.log(res.rows);
    client.end();
  });
});
