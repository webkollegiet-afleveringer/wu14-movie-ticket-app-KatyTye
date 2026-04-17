import MovieExample from '../assets/data/movie.json';
import CrewExample from '../assets/data/crew.json';

export async function fetchMovieFromID(id) {

	if (!import.meta.env.VITE_PRODUCTION) {
		return {
			...MovieExample,
			director: CrewExample.crew.find(p => p.job === "Director").name
		}
	} else {
		const [movieRes, creditsRes] = await Promise.all([
			fetch(`${import.meta.env.VITE_API_URL}/movie/${id}?language=en-US`, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
				}
			}),
			fetch(`${import.meta.env.VITE_API_URL}/movie/${id}/credits?language=en-US`, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
				}
			})
		])

		const movie = await movieRes.json()
		const credits = await creditsRes.json()

		const director = credits.crew.find(p => p.job === "Director")

		console.log(credits)

		return ({
			...movie,
			director: director ? director.name : "Unknown"
		})
	}
} 