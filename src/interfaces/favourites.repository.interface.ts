export interface MoviePreview{
    Title:string;
    Year:string;
    imdbID:string;
    Type:"movie",
    Poster:string
}

export interface IFavouritesRepository {
    getFavourites(userId: string): MoviePreview[] 

    addFavourite(userId: string, movie: MoviePreview): MoviePreview[] 

    removeFavourite(userId: string, imdbID: string): MoviePreview[]
}