import MoviesExample from '../assets/data/movies.json';

export function fetchMovieFromID(id) {

	if (!import.meta.env.VITE_PRODUCTION) {
		const response = MoviesExample
		const movie = response.find(movie => movie.id == id)

		return movie
	}

	return {
		status: "error",
		message: "Not implemented yet"
	}
} 