import { FaStar } from "react-icons/fa";
import { Link, useRouteLoaderData } from "react-router";
import { useState } from "react";

export default function Details() {
	const [showMore, setShowMore] = useState(false)
	const movie = useRouteLoaderData("movie")

	return (<main className="page-content">
		<div className="page-content__images">
			{movie.images.map((name, idx) => {
				return <img src={`${location.origin}/images/${name}.jpg`} alt={`image ${idx}`}
					key={`movies-images-${idx}`} />
			})}
		</div>
		<article className="page-content__article">
			<h2 className="page-content__article-title">
				{movie.name}
			</h2>
			<p className="page-content__article-short-description">Director: <span>
				{movie.director}
			</span> | <FaStar /> <span>
					{movie.rated}
				</span></p>
			<ol className="page-content__article-tags">
				<li className="page-content__article-tag">
					{movie.tags[0]}
				</li>
				<li className="page-content__article-tag">
					{movie.tags[1]}
				</li>
				<li className="page-content__article-tag">
					{movie.duration}
				</li>
			</ol>
			<h3 className="page-content__article-title-disc">
				Synopsis
			</h3>
			<p className="page-content__description">
				<span className="page-content__description-text">
					{movie.description.split(" ").map((txt, idx) => {
						if (idx <= 18) {
							return txt
						} else if (showMore == true) {
							return txt
						}
					}).join(" ")}
				</span>
				<span onClick={() => setShowMore(!showMore)}
					className="page-content__description-button blue-text">
					{(showMore == false && "Read More"
						|| "Hide More"
					)}
				</span>
			</p>
		</article>
		<Link to={`/seats/${movie.id}`}
			className="page-content__button">Book Ticket</Link>
	</main>)
}