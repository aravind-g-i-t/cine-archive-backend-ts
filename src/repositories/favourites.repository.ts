import type { IFavouritesRepository, MoviePreview } from "../interfaces/favourites.repository.interface.js";

const favouritesStore = new Map();


export class FavouritesRepository implements IFavouritesRepository{

    getFavourites(userId: string): MoviePreview[] {
        return favouritesStore.get(userId)||[]
    }

    addFavourite(userId: string, movie: MoviePreview): MoviePreview[] {
        const favs = favouritesStore.get(userId) || [];
        const updatedFavourites=[movie,...favs];
        favouritesStore.set(userId,updatedFavourites );
        return updatedFavourites;
    }

    removeFavourite(userId: string, imdbID: string): MoviePreview[] {
        const favs: MoviePreview[] = favouritesStore.get(userId) || []
        const updatedFavs = favs.filter(
            movie => movie.imdbID !== imdbID
        );
        favouritesStore.set(userId, updatedFavs);
        return updatedFavs;
    }
}

