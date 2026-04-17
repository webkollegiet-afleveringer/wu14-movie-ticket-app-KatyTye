import { FaStar } from "react-icons/fa";
import { Link, useRouteLoaderData } from "react-router";
import { useState } from "react";
import { convertMinutesToText } from "../helpers/Converter";

export default function Details() {
	const [showMore, setShowMore] = useState(false)
	const movie = useRouteLoaderData("movie")

	return (<main className="page-content details">
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
	</main>)
}