
export const MESSAGES = {

    SUCCESS: "Operation completed successfully",
    SAVED: "Saved successfully",
    UPDATED: "Updated successfully",
    DELETED: "Deleted successfully",
    NOT_FOUND: "Resource not found",
    SERVER_ERROR: "An unexpected error occurred",

    ROUTE_NOT_FOUND: "Route not found",

    SEARCH_QUERY_REQUIRED: "Search query is required",
    NO_MOVIES_FOUND: "No movies found",

    SESSION_ID_REQUIRED: "Session ID is required",
    MOVIE_DATA_REQUIRED: "Valid movie data is required",
    MOVIE_ALREADY_FAVOURITE: "Movie is already in favourites",
    MOVIE_NOT_IN_FAVOURITES: "Movie not found in favourites",
    MOVIE_NOT_FOUND: "Movie not found"


} as const;

export type Message = typeof MESSAGES[keyof typeof MESSAGES];
