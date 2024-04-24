import { Request, Response } from "express";
import client from "../db/DB_setup/postgresSetup";

type SignupProp = {
  email: string;
  password: string;
  neo4j: string;
};

const signup = async (req: Request, res: Response) => {
  console.log("POST signup route called");
  try {
    const { email, password, neo4j }: SignupProp = req.body;

    await client.query("BEGIN");
    if (!email || !password || !neo4j) throw { status: 404, message: "missing required fields" };

    const insertCommand = `INSERT INTO users(email, password, neo4j_id) VALUES ($1, $2, $3)`;
    const values = [email, password, neo4j];
    const response = await client.query(insertCommand, values);

    if (response.rowCount) {
      await client.query("COMMIT");
      console.log("-- user created");
      return res.json({ message: "User signed in successfully" });
    } else {
      throw { status: 409, message: "user cannot be created" };
    }
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") {
      error.status = 409;
      error.message = `${error.detail}`;
    }
    console.log("-- " + error.message || "- Unexpected error occurred");
    return res.status(error.status || 500).json({ message: error.message || "Unexpected error occurred" });
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
