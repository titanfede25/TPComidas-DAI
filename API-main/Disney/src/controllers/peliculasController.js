import { Router } from 'express';
import Pelicula from '../models/Pelicula.js'; 
import {createMovie, getAllMovies, filteredMovies, getDetailedMovie, updateMovie, deleteMovie} from '../services/peliculasService.js';

const router = Router();

router.get ('/movies', async(req, res)=>{
    let status = 200;
    const pelicula         = new Pelicula()
    pelicula.Nombre        = req.query.name;
    pelicula.Orden         = req?.query?.order?.toUpperCase();
    let peliculas;
    if(pelicula.Nombre || pelicula.Orden){
        if(pelicula.Orden != "ASC" && pelicula.Orden != "DESC"){
            status = 400;
        }
        else{
            peliculas = await filteredMovies(pelicula);
        }
    }
    else{
        peliculas = await getAllMovies();
    }
    res.status(status).send(peliculas);
})
router.get ('/movies/:id', async(req, res)=>{ 
    let status = 200;
    const id               = req.params.id;
    const pelicula         = await getDetailedMovie(id);
    if(pelicula == null){
        status = 404;
    }
    if (id < 0){
        status = 400;
    }
    res.status(status).send(pelicula);
})
router.post ('/movies', async(req, res)=>{
    let status = 201;
    let creado;
    const pelicula              = new Pelicula();
    pelicula.Imagen             = req.body.Imagen;
    pelicula.Titulo             = req.body.Titulo;
    pelicula.FechaCreacion      = req.body.FechaCreacion;
    pelicula.Calificacion       = req.body.Calificacion;
    if(pelicula.Calificacion < 0 || pelicula.Calificacion > 5){
        status = 400;
    }
    else{
        creado = await createMovie(pelicula);
        if(creado==null){
            status = 400;
        }
    }
    res.status(status).send(creado);
})
router.put ('/movies/:id', async(req, res)=>{
    let status = 200;
    const id                    = req.params.id;
    const pelicula              = new Pelicula();
    pelicula.Imagen             = req.body.Imagen;
    pelicula.Titulo             = req.body.Titulo;
    pelicula.FechaCreacion      = req.body.FechaCreacion;
    pelicula.Calificacion       = req.body.Calificacion;

    const cambiado      = await updateMovie(pelicula, id);
    if(req.params.id < 0 || cambiado == null){
        status = 400;
    }
    res.status(status).send(cambiado);
})
router.delete ('/movies/:id', async(req, res)=>{
    let status = 200;
    if(req.params.id < 0){
        status = 400;
    }
    const idBorrado     = await deleteMovie(req.params.id);
    res.status(status).send(idBorrado);
})

export default router;