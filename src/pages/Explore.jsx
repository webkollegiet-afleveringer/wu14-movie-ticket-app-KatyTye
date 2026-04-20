import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa"
import { useRouteLoaderData } from "react-router"
import { useState } from "react"

function returnStars(rated = 0) {
	let currentRating = (rated * 0.5).toFixed(1)
	let starElements = []

	while (currentRating >= 0.1) {
		if (currentRating >= 0.9) {
			starElements.push(<FaStar className="full-star"
				key={currentRating} />)
			currentRating = (currentRating - 1).toFixed(1)
		} else {
			starElements.push(<FaStarHalf className="half-star"
				key={currentRating} />)
			currentRating = 0
		}
	}

	while (starElements.length < 5) {
		starElements.push(<FaStar className="nothing-star"
			key={`star-${starElements.length}`} />)
	}

	return starElements
}

export default function Explore() {
	const [showUpcoming, setShowUpcoming] = useState(false)
	const movieData = useRouteLoaderData("root")

	console.log(movieData)

	return (<main className="page-content explore">
		<div className="explore__buttons">
			<button className={`explore__button${(showUpcoming == false && " active" || "")}`}>
				Now Showing
			</button>
			<button className={`explore__button${(showUpcoming == true && " active" || "")}`}>
				Upcoming
			</button>
		</div>

		{(!showUpcoming && <>
			<section className="explore__top">
				<h2 className="explore__top-title">Top Movies</h2>
				<ol className="explore__top-list">
					{movieData?.trending?.map((movie, index) => {
						return <li className="explore__top-item" key={`movie-trending-${index}`}>
							<img className="explore__top-item-image"
								loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="image of movie" />
							<p className="explore__top-item-name">{movie.original_title}</p>
							<div className="explore__top-item-stars">
								{returnStars(movie.vote_average)}
							</div>
						</li>
					})}
				</ol>
			</section>
			<section className="explore__rec">
				<h2 className="explore__rec-title">Recommended</h2>
				<ol className="explore__rec-list">
					{movieData?.recommendations?.map((movie, index) => {
						return <li className="explore__rec-item" key={`movie-recommended-${index}`}>
							<img className="explore__rec-item-image"
								loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="image of movie" />
							<p className="explore__rec-item-name">{movie.original_title}</p>
						</li>
					})}
				</ol>
			</section>
		</> || <>

			</>)}
	</main>)
}