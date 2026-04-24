import RecommendationsExample from '../assets/data/recommendations.json';
import CommingSoonExample from '../assets/data/commingSoon.json';
import TrendingExample from '../assets/data/trending.json';
import CinemaExample from '../assets/data/cinema.json';
import MovieExample from '../assets/data/movie.json';
import CrewExample from '../assets/data/crew.json';

const fetchHeader = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
	}
}

const extraFetchHeader = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		"key-path": `${import.meta.env.VITE_PRM_API_PATH}`,
		Authorization: `Bearer ${import.meta.env.VITE_PRM_API_KEY}`
	}
}

const getLocation = () => new Promise((resolve, reject) => {
	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords
		resolve({
			"lat": latitude,
			"lon": longitude
		})
	}, () => {
		reject("Please allow location access to get cinemas near you.")
	})
})

export async function initialMovieFetches() {
	if (!import.meta.env.VITE_PRODUCTION) {
		return {
			trending: TrendingExample,
			recommendations: RecommendationsExample,
			commingSoon: CommingSoonExample,
			cinema: CinemaExample
		}
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

export async function fetchMovieTickets() {

	if (!import.meta.env.VITE_PRODUCTION) {
		const response = await fetch("http://localhost:3000/mymovies/tickets", extraFetchHeader)
		const data = await response.json()

		return data.result
	} else {
		const response = await fetch(`${import.meta.env.VITE_PRM_API_URL}`, extraFetchHeader)
		const data = await response.json()

		return data.result
	}
} 