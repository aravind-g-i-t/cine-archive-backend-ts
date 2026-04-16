export const ROUTES = {
    SEARCH: "/search",
    FAVORITES: "/favorites",
    MOVIE_DETAILS: "/details",
    FAVOURITE_ID: "/favorites/:imdbID", 
} as const

export type Routes = typeof ROUTES[keyof typeof ROUTES];