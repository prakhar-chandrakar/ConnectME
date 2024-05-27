import { Request, Response } from "express";
import client from "../db/DB_setup/postgresSetup";
import { session } from "../db/DB_setup/neo4jSetup";
import { v4 as uuidv4 } from "uuid";

type SignupProp = {
  email: string;
  password: string;
};

const signup = async (req: Request, res: Response) => {
  console.log("POST signup route called");
  try {
    const { email, password }: SignupProp = req.body;
    if (!email || !password) throw { status: 400, message: "Missing required fields" };

    // Check
    const findCommand = `SELECT email FROM users WHERE email = $1`;
    const values1 = [email];
    const response1 = await client.query(findCommand, values1);
    if (response1.rowCount) throw { status: 409, message: "User already exists" };

    // Generate new UUID
    const user_id: string = uuidv4().substr(0, 16);

    // Create user in Neo4j
    const neo4jResponse = await session.run(`CREATE (u:User {user_id: '${user_id}', email: '${email}'})`);
    // console.log(neoResponse);
    if (neo4jResponse) {
      console.log("-- User create in Neo4j DB");

      // Create user in Postgress Db
      const insertCommand = `INSERT INTO users(user_id, email, password) VALUES ($1, $2, $3)`;
      const values2 = [user_id, email, password];
      const response2 = await client.query(insertCommand, values2);
      if (response2) {
        console.log("-- User created in Postgress DB");
        return res.json({ message: "User signed up successfully" });
      } else {
        throw { status: 500, message: "Unable to create row in Postgress" };
      }
    } else {
      throw { status: 500, message: "Unable to create node in neo4j" };
    }
  } catch (error) {
    console.error("Error during signup:", error);
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || "Unexpected error occurred" });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  console.log("GET all users called");
  try {
    const getcommand = `SELECT * FROM users`;
    const response = await client.query(getcommand);

    if (response) {
      console.log("-- user found", response.rowCount);
      res.json(response.rows);
    } else {
      throw { status: 404, message: "no user found" };
    }
  } catch (error) {
    console.log("-- " + error.message || "- Unexpected error occurred");
    return res.status(error.status || 500).json({ message: error.message || "Unexpected error occurred" });
  }
};

const user = {
  signup,
  getAllUser,
};

export default user;
