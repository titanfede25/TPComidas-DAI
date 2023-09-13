import { Router } from 'express';
import Personaje from '../models/personaje.js'; 
import {filteredCharacters, getAllCharacters, createCharacter, updateCharacter, deleteCharacter, getDetailedCharacter} from '../services/personajesService.js'
import {Authenticate} from '../common/jwt.strategy.js';

const router = Router();

router.get ('/characters', Authenticate, async(req, res)=>{
    const personaje         = new Personaje();
    personaje.Nombre        = req.query.name;
    personaje.Edad          = req.query.age;
    personaje.Peso          = req.query.weight;
    personaje.IdPelicula    = req.query.movies;
    let personajes;
    if(personaje.Nombre || personaje.Edad || personaje.Peso || personaje.IdPelicula){
        personajes = await filteredCharacters(personaje);
    }
    else{
        personajes = await getAllCharacters(personaje);
    }
    res.status(200).send(personajes);
})
router.post ('/characters', Authenticate, async(req, res)=>{
    let status = 201;
    const personaje     = new Personaje();
    personaje.Imagen    = req.body.image;
    personaje.Nombre    = req.body.name;
    personaje.Edad      = req.body.age;
    personaje.Peso      = req.body.weight;
    personaje.Historia  = req.body.story;
    const creado        = await createCharacter(personaje);
    if(creado==null){
        status = 400;
    }
    res.status(status).send(creado);
})
router.put ('/characters/:id', Authenticate, async(req, res)=>{
    let status = 200;
    const id            = req.params.id;
    const personaje     = new Personaje();
    personaje.Imagen    = req.body.image;
    personaje.Nombre    = req.body.name;
    personaje.Edad      = req.body.age;
    personaje.Peso      = req.body.weight;
    personaje.Historia  = req.body.story;
    const cambiado      = await updateCharacter(personaje, id);
    if(req.params.id < 0 || cambiado == null){
        status = 400;
    }
    res.status(status).send(cambiado);
})
router.delete ('/characters/:id',Authenticate, async(req, res)=>{
    let status = 200;
    if(req.params.id < 0){
        status = 400;
    }
    const idBorrado     = await deleteCharacter(req.params.id);
    res.status(status).send(idBorrado);
})
router.get ('/characters/:id',Authenticate, async(req, res)=>{ 
    let status = 200;
    const id               = req.params.id;
    const personaje    = await getDetailedCharacter(id);
    if(personaje == null){
        status = 404;
    }
    if (id < 0){
        status = 400;
    }
    res.status(status).send(personaje);
})

export default router;