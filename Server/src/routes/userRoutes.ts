import { Router, Request, Response } from "express";
import user from "../controllers/user";

const router = Router();

router.get("/hi", (req: Request, res: Response): void => {
  res.json({ message: "Hello there" });
});

router.post("/signup", user.signup);
router.get("/allusers", user.getAllUser);

export default router;
