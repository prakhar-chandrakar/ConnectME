import neo4j, { driver, Session } from "neo4j-driver";
import config from "../../config/serverConfig";

let session: Session;

async function Neo4j() {
  const URI: string = config.neo4j_uri!;
  const user: string = config.neo4j_user!;
  const password: string = config.neo4j_pass!;
  try {
    const driver = neo4j.driver(URI, neo4j.auth.basic(user, password));
    session = driver.session();
    console.log("-> NEO4J database connection established");
  } catch (err) {
    console.log(`-> Connection error in Neo4j`);
  }
}

export { Neo4j, session }; 