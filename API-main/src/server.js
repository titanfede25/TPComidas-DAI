import express from "express";
import passport from "passport";
import personajesController from "./controllers/personajesController.js";
import peliculasController from "./controllers/peliculasController.js";
import {jwtStrategy} from "./common/jwt.strategy.js"
import auth from "./controllers/auth.js"
const app = express();
const port = 3001;
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("", auth)
app.use("", personajesController)
app.use("", peliculasController)

app.listen (port, ()=>{
    console.log(`EJEMPLO ${port}`)
})

