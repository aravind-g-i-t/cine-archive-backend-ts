import type { MoviePreview } from "./favourites.repository.interface.js";

export interface SearchMoviesOutput{
    movies:MoviePreview[],
    totalResults:number,
    totalPages:number
}

export interface MovieDetails{
    Title:string,
    Year:number,
    Rated:string,
    Released:string,
    Runtime:string;
    Genre:string;
    Director:string;
    Writer:string;
    Actors:string;
    Plot: string;
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: {
            Source: string,
            Value: string
        }[],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: "movie",
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string
}


export interface IMovieService {


    searchMovies(title: string, page: number): Promise<SearchMoviesOutput> 

    getFavourites(userId: string):MoviePreview[]

    addFavourite(userId: string, movie:MoviePreview):MoviePreview[]
    removeFavourite(userId:string, imdbID:string):MoviePreview[]

    getMovieDetails (imdbID:string):Promise<MovieDetails> 
}





