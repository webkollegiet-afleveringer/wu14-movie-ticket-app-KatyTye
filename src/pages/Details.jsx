import { Link, useParams, useRouteLoaderData } from "react-router";
import { convertMinutesToText, randomInt, returnDateAndTime } from "../helpers/Converter";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function Details() {
	const [showMore, setShowMore] = useState(false)
	const movie = useRouteLoaderData("movie")
	const root = useRouteLoaderData("root")
	const movieID = useParams().id

	function handlePlanToggle() {
		const CURRENT_PLANS = localStorage.getItem("mymovies-plan") || "[]"

		let jsonPlans = JSON.parse(CURRENT_PLANS)

		if (jsonPlans.length == 0 || jsonPlans.map(plan => plan.id == movieID).join() == "false") {
			let datesAndTimes = returnDateAndTime()

			jsonPlans.push({
				people: 1,
				id: movieID,
				tag: movie.genres[0].name,
				name: movie.original_title,
				dates: datesAndTimes.dates,
				times: datesAndTimes.times,
				rated: (movie.vote_average / 2),
				duration: convertMinutesToText(movie.runtime),
				cinemas: root.cinema.map(place => place.properties.name),
				seats: [randomInt(1, 40), randomInt(1, 40), randomInt(1, 40)],
			})

			localStorage.setItem("mymovies-plan", JSON.stringify(jsonPlans))
		} else {
			localStorage.setItem("mymovies-plan", JSON.stringify(jsonPlans.filter(plan =>
				plan.id != movieID
			)))
		}
	}

	return (<>
		<button className="plan-button"
			onClick={() => handlePlanToggle()}>
		</button>
		<main className="page-content details">
			<div className="details__images">
				<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					className="details__image" />
			</div>
			<article className="details__article">
				<h2 className="details__article-title">
					{movie.original_title}
				</h2>
				<p className="details__article-short-description">Director: <span>
					{movie.director}
				</span> | <FaStar /> <span>
						{movie.vote_average.toFixed(1)}
					</span></p>
				<ol className="details__article-tags">
					{movie.genres.map((tag, idx) => {
						return <li className="details__article-tag"
							key={`movie-tags-${idx}`}>
							{tag.name}
						</li>
					})}
					<li className="details__article-tag">
						{convertMinutesToText(movie.runtime)}
					</li>
				</ol>
				<h3 className="details__article-title-disc">
					Synopsis
				</h3>
				<p className="details__description">
					<span className="details__description-text">
						{movie.overview.split(" ").map((txt, idx) => {
							if (idx <= 18) {
								return txt
							} else if (showMore == true) {
								return txt
							}
						}).join(" ")}
					</span>
					<span onClick={() => setShowMore(!showMore)}
						className="details__description-button">
						{(showMore == false && " Read More"
							|| " Hide More"
						)}
					</span>
				</p>
			</article>
			<Link to={`/seats/${movie.id}`}
				className="details__button">Book Ticket</Link>
		</main></>)
}