import { FaStar } from "react-icons/fa";
import { Link, useRouteLoaderData } from "react-router";
import { useState } from "react";

export default function Details() {
	const [showMore, setShowMore] = useState(false)
	const movie = useRouteLoaderData("movie")

	return (<main className="page-content details">
		<div className="details__images">
			{movie.images.map((name, idx) => {
				return <img src={`${location.origin}/images/${name}.jpg`} alt={`image ${idx}`}
					className="details__image"
					key={`movies-images-${idx}`} />
			})}
		</div>
		<article className="details__article">
			<h2 className="details__article-title">
				{movie.name}
			</h2>
			<p className="details__article-short-description">Director: <span>
				{movie.director}
			</span> | <FaStar /> <span>
					{movie.rated}
				</span></p>
			<ol className="details__article-tags">
				{movie.tags.map((tag, idx) => {
					return <li className="details__article-tag"
						key={`movie-tags-${idx}`}>
						{tag}
					</li>
				})}
				<li className="details__article-tag">
					{movie.duration}
				</li>
			</ol>
			<h3 className="details__article-title-disc">
				Synopsis
			</h3>
			<p className="details__description">
				<span className="details__description-text">
					{movie.description.split(" ").map((txt, idx) => {
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