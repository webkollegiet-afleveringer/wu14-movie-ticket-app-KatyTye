import MovieExample from '../assets/data/movie.json';
import CrewExample from '../assets/data/crew.json';

const fetchHeader = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
	}
}

const getLocation = () => new Promise((resolve, reject) => {
	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords
		resolve({
			"lat": latitude,
			"lon": longitude
		})
	}, reject)
})

export async function initialMovieFetches() {
	if (!import.meta.env.VITE_PRODUCTION) {

	} else {
		const loc = await getLocation()
		const [trendingRes, recommendationsRes, commingSoonRes, cinemaRes] = await Promise.all([
			fetch(`${import.meta.env.VITE_API_URL}/trending/movie/week`, fetchHeader),
			fetch(`${import.meta.env.VITE_API_URL}/movie/634649/recommendations`, fetchHeader),
			fetch(`${import.meta.env.VITE_API_URL}/movie/upcoming`, fetchHeader),
			fetch(`${import.meta.env.VITE_GEO_API_URL}&filter=circle:${loc.lon},${loc.lat},5000&bias=proximity:${loc.lon},${loc.lat}&limit=10&apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
		])

		const trending = await trendingRes.json()
		const recommendations = await recommendationsRes.json()
		const commingSoon = await commingSoonRes.json()
		const cinema = await cinemaRes.json()

		return {
			trending: trending.results,
			recommendations: recommendations.results,
			commingSoon: commingSoon.results,
			cinema: cinema.features
		}
	}
}

export async function fetchMovieFromID(id) {

	if (!import.meta.env.VITE_PRODUCTION) {
		return {
			...MovieExample,
			director: CrewExample.crew.find(p => p.job === "Director").name
		}
	} else {
		const [movieRes, creditsRes] = await Promise.all([
			fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`, fetchHeader),
			fetch(`${import.meta.env.VITE_API_URL}/movie/${id}/credits`, fetchHeader)
		])

		const movie = await movieRes.json()
		const credits = await creditsRes.json()

		const director = credits.crew.find(p => p.job === "Director")

		return ({
			...movie,
			director: director ? director.name : "Unknown"
		})
	}
}