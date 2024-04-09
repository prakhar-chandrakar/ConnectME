import { Request, Response } from "express";
import client from "../db/postgresSetup";

type SignupProp = {
  username: string;
  email: string;
  password: string;
};

const signup = async (req: Request, res: Response) => {
  console.log("POST signup route called");
  try {
    const { username, email, password }: SignupProp = req.body;
    const insertCommand = `INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`;
    const values = [username, email, password];
    await client.query(insertCommand, values);
    console.log("-- Data inserted");
    console.log("-- User Signed in");
    return res.json({ message: "User signed in successfully" });
  } catch (error) {
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
      console.log("-- Data sent");
      res.json(response.rows);
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
