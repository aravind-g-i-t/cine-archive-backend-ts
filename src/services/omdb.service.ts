import axios from "axios";
import dotenv from "dotenv"
import type { IFavouritesRepository, MoviePreview } from "../interfaces/favourites.repository.interface.js";
import type { IMovieService, MovieDetails, SearchMoviesOutput } from "../interfaces/movies.service.interface.js";
import { AppError } from "../shared/errors/AppError.js";
import { MESSAGES } from "../shared/constants/messages.js";
dotenv.config()

const OMDB_BASE_URL = process.env.OMDB_BASE_URL!;
const OMDB_API_KEY = process.env.OMDB_API_KEY!;




export class OmdbService implements IMovieService{

    constructor(
        private _favouriteRepository: IFavouritesRepository,
    ) { }

    searchMovies = async (search: string, page: number = 1): Promise<SearchMoviesOutput> => {
        if (!search || search.trim() === "") {
            throw new AppError(MESSAGES.SEARCH_QUERY_REQUIRED, 400);
        }

        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: OMDB_API_KEY,
                s: search.trim(),
                type: "movie",
                page,
            },
        });
        const data = response.data;
        if (data.Response === "False") {
            throw new AppError(data.Error || MESSAGES.NO_MOVIES_FOUND, 404);
        }
        return {
            movies: data.Search,
            totalResults: parseInt(data.totalResults),
            totalPages: Math.ceil(parseInt(data.totalResults) / 10),
        };
    }

    getFavourites = (sessionId: string) => {
        if (!sessionId) {
            throw new AppError(MESSAGES.SESSION_ID_REQUIRED, 400);
        }

        const favourites= this._favouriteRepository.getFavourites(sessionId);
        
        return favourites;
    }




    addFavourite = (sessionId: string, movie: MoviePreview) => {
        if (!sessionId) {
            throw new AppError(MESSAGES.SESSION_ID_REQUIRED, 400);
        }

        if (!movie || !movie.imdbID) {
            throw new AppError(MESSAGES.MOVIE_DATA_REQUIRED, 400);
        }

        const favourites = this._favouriteRepository.getFavourites(sessionId);
        console.log(favourites);
        

            const alreadyExists = favourites.some((f) => f.imdbID === movie.imdbID);
            if (alreadyExists) {
                throw new AppError(MESSAGES.MOVIE_ALREADY_FAVOURITE, 400);
            }
        const updatedFavourites = this._favouriteRepository.addFavourite(sessionId, movie);
        return updatedFavourites;

    };

    removeFavourite = (sessionId: string, imdbID: string) => {
        if (!sessionId) {
            throw new AppError(MESSAGES.SESSION_ID_REQUIRED, 400);
        }

        if (!imdbID) {
            throw new AppError(MESSAGES.MOVIE_DATA_REQUIRED, 400);
        }

        const favourites = this._favouriteRepository.getFavourites(sessionId);

        const exists = favourites.some((f) => f.imdbID === imdbID);
        if (!exists) {
            throw new AppError(MESSAGES.MOVIE_NOT_IN_FAVOURITES, 404);
        }

        const updatedFavourites = this._favouriteRepository.removeFavourite(sessionId, imdbID);
        return updatedFavourites;

    };

    getMovieDetails = async (imdbID:string):Promise<MovieDetails> => {
        const response = await axios.get(OMDB_BASE_URL, {
            params: { apikey: OMDB_API_KEY, i: imdbID, plot: "full" },
        });
        if (response.data.Response === "False") {
            throw new AppError(response.data.Error || MESSAGES.MOVIE_NOT_FOUND, 404);
        }
        return response.data;
    };
};





