import express, { type NextFunction, type Request, type Response } from "express";

import { MovieController } from "../controllers/movie.controller.js";
import { OmdbService } from "../services/omdb.service.js";
import { FavouritesRepository } from "../repositories/favourites.repository.js";
import { ROUTES } from "../shared/constants/routes.js";
import { handleSessionId } from "../middlewares/sessionIdHandler.middleware.js";

const favouritesRepository = new FavouritesRepository();
const omdbService = new OmdbService(favouritesRepository);
const movieController = new MovieController(omdbService);


const movieRoutes=express.Router();

// Search movies

movieRoutes.get(ROUTES.SEARCH,(req:Request,res:Response,next:NextFunction)=>movieController.searchMovies(req,res,next));

// Get favourites

movieRoutes.get(ROUTES.FAVORITES,handleSessionId,(req:Request,res:Response,next:NextFunction)=>movieController.getFavourites(req,res,next));

// Add to favourites

movieRoutes.post(ROUTES.FAVORITES,handleSessionId,(req:Request,res:Response,next:NextFunction)=>movieController.addFavourite(req,res,next));

// Remove from favourites

movieRoutes.delete(ROUTES.FAVOURITE_ID,handleSessionId,(req:Request,res:Response,next:NextFunction)=>movieController.removeFavourite(req,res,next));

// Get movie details

movieRoutes.get(ROUTES.MOVIE_DETAILS,(req:Request,res:Response,next:NextFunction)=>movieController.getMovieDetails(req,res,next));

export default movieRoutes;