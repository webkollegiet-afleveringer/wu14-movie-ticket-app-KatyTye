import { FaStar } from "react-icons/fa"
import { Link, useRouteLoaderData } from "react-router"
import { convertDateToText } from "../helpers/Converter"

export default function Home() {
	const movieData = useRouteLoaderData("root")

	return (<main className="home-content">
		<section className="home-content__soon">
			<h2 className="home-content__soon-title">Coming Soon</h2>
			<ol className="home-content__soon-list">
				{movieData?.trending?.map((movie, index) => {

					if (index > 9) { return }

					const releaseDate = new Date(movie.release_date)

					return <li className="home-content__soon-item" key={`movie-trending-${index}`}>
						<Link to={`/details/${movie.id}`}>
							<img className="home-content__soon-item-image"
								loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="image of movie" />
							<p className="home-content__soon-item-name">{movie.original_title}</p>
							<p className="home-content__soon-item-release">
								{convertDateToText(releaseDate)} {releaseDate.getFullYear()}
							</p>
						</Link>
					</li>
				}) || <p>No movies where found that is comming soon</p>}
			</ol>
		</section>
	</main>)
}