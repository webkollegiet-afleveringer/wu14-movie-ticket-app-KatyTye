import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa"
import { Link, useRouteLoaderData } from "react-router"
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
			starElements.push(<FaStarHalfAlt className="half-star"
				key={currentRating} />)
			currentRating = 0
		}
	}

	while (starElements.length < 5) {
		starElements.push(<FaRegStar className="nothing-star"
			key={`star-${starElements.length}`} />)
	}

	return starElements
}

export default function Explore() {
	const [showUpcoming, setShowUpcoming] = useState(false)
	const [showMore, setShowMore] = useState(0)
	const movieData = useRouteLoaderData("root")

	function toggleShowMore(button = 0) {
		if (showMore == 0 || showMore != button) {
			setShowMore(button)
		} else {
			setShowMore(0)
		}
	}
	console.log(movieData)

	return (<main className="page-content explore">
		<div className="explore__buttons">
			<button className={`explore__button${(showUpcoming == false && " active" || "")}`}
				onClick={() => setShowUpcoming(false)}>
				Now Showing
			</button>
			<button className={`explore__button${(showUpcoming == true && " active" || "")}`}
				onClick={() => setShowUpcoming(true)}>
				Upcoming
			</button>
		</div>

		{(!showUpcoming && <>
			<section className="explore__top">
				<h2 className="explore__top-title"><span>
					Top Movies
				</span><span className="explore__top-button" onClick={() => { toggleShowMore(1) }}>
						{((showMore == 2 || showMore == 0) && "See more" || "Hide more")}
					</span></h2>
				<ol className={`explore__top-list${(showMore == 1 && " active" || "")}`}>
					{movieData?.trending?.map((movie, index) => {
						return <li className="explore__top-item" key={`movie-trending-${index}`}>
							<Link to={`/details/${movie.id}`}>
								<img className="explore__top-item-image"
									loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="image of movie" />
								<p className="explore__top-item-name">{movie.original_title}</p>
								<div className="explore__top-item-stars">
									{returnStars(movie.vote_average)}
								</div>
							</Link>
						</li>
					})}
				</ol>
			</section>
			<section className="explore__rec">
				<h2 className="explore__rec-title">
					<span>
						Recommended
					</span><span className="explore__top-button" onClick={() => { toggleShowMore(2) }}>
						{((showMore == 1 || showMore == 0) && "See more" || "Hide more")}
					</span></h2>
				<ol className={`explore__rec-list${(showMore == 2 && " active" || "")}`}>
					{movieData?.recommendations?.map((movie, index) => {
						return <li className="explore__rec-item" key={`movie-recommended-${index}`}>
							<Link to={`/details/${movie.id}`}>
								<img className="explore__rec-item-image"
									loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="image of movie" />
								<p className="explore__rec-item-name">{movie.original_title}</p>
							</Link>
						</li>
					})}
				</ol>
			</section>
		</> || <ul className="explore__soon">
				{movieData?.commingSoon?.map((movie, index) => {
					return <li className="explore__soon-item" key={`movie-commingSoon-${index}`}>
						<Link to={`/details/${movie.id}`}>
							<img className="explore__soon-item-image"
								loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="image of movie" />
							<p className="explore__soon-item-name">{movie.original_title}</p>

						</Link>
					</li>
				})}
			</ul>)}
	</main>)
}