import jwt from "jsonwebtoken";
import "dotenv/config";
import {getRandomString, getSignedToken, authenticate} from "../services/authService.js";
import { Router } from "express";
const router = Router();


router.post ('/auth/login/email/password', async(req, res)=>{
  const email = req.params.email;
  const password = req.params.password;
  if(authenticate(email, password)){
    const i = await getSignedToken();
    return res.status(200).send(i);
  }
  else{
    res.status(401).send();
  }
})

export default router;
