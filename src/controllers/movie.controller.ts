import type { NextFunction, Request, Response } from "express";
import type { IMovieService } from "../interfaces/movies.service.interface.js";

export class MovieController {
    constructor(private movieService: IMovieService) { }

    searchMovies = async (req: Request, res: Response, next: NextFunction) => {
        const { search, page = 1 } = req.query;

        console.log(req.query);

        
        if (!search || !(search as string).trim()) {
            return res.status(400).json({ error: "Search query is required" });
        }

        try {
            const result = await this.movieService.searchMovies(search as string, parseInt(page as string));
            console.log(result);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    getFavourites = (req: Request, res: Response, next: NextFunction) => {
        
        const sessionId= req.sessionId!
        try {
            const favourites = this.movieService.getFavourites(sessionId);
            return res.status(200).json({ favourites });
        } catch (error) {
            next(error);
        }
    };

    addFavourite = (req: Request, res: Response, next: NextFunction) => {
        
        console.log("logger");
        console.log(req.cookies.sessionId);
        
        const sessionId=req.sessionId!;
        
        
        const {  movie } = req.body;

        if (!movie || !movie.imdbID) {
            return res.status(400).json({ error: "Valid movie data is required" });
        }

        try {
            const updated = this.movieService.addFavourite(sessionId, movie);
            return res.status(201).json({ favourites: updated });
        } catch (error) {
            next(error);
        }
    };


    removeFavourite = (req: Request, res: Response, next: NextFunction) => {
        const { imdbID } = req.params;
        const sessionId=req.sessionId!;


        if (!imdbID) {
            return res.status(400).json({ error: "IMDB ID is required" });
        }

        try {
            const updated = this.movieService.removeFavourite(sessionId, imdbID as string);
            return res.status(200).json({ favourites: updated });
        } catch (error) {
            next(error);
        }
    };

    getMovieDetails = async (req: Request, res: Response, next: NextFunction) => {
        const { imdbID } = req.query;
        if (!imdbID) return res.status(400).json({ error: "IMDB ID is required" });
        try {
            const movie = await this.movieService.getMovieDetails(imdbID as string);
            return res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    };

}

