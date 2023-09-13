import jwt from "jsonwebtoken";
import "dotenv/config";
import {getRandomString, getSignedToken} from "../services/authService.js";
import { Router } from "express";
const router = Router();


router.post ('/auth/login', async(req, res)=>{
  const i = await getSignedToken();
  return res.status(200).send(i);
})

export default router;
