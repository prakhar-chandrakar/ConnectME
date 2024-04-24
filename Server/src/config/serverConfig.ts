import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.SERVER_PORT,
  postgres_user: process.env.POSTGRES_USER,
  postgres_host: process.env.POSTGRES_HOST,
  postgres_db: process.env.POSTGRES_DATABASE,
  postgres_pass: process.env.POSTGRES_PASSWORD,
  postgres_port: process.env.POSTGRES_PORT,
  neo4j_uri: process.env.NEO4J_URI,
  neo4j_user: process.env.NEO4J_USER,
  neo4j_pass: process.env.NEO4J_PASSWORD,
  neonDb_url: process.env.neonDB_URL,
};
export default config;
