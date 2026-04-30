import { FaStar } from "react-icons/fa"
import { Link, useRouteLoaderData } from "react-router"
import { convertDateToText } from "../helpers/Converter"
import { FaLocationDot } from "react-icons/fa6"

export default function Home() {
	const movieData = useRouteLoaderData("root")

	return (<main className="home-content">
		<section className="home-content__soon">
			<h2 className="home-content__soon-title">Coming Soon</h2>
			<ol className="home-content__soon-list">
				{movieData?.commingSoon?.map((movie, index) => {

					if (index > 9) { return }

					const releaseDate = new Date(movie.release_date)

					return <li className="home-content__soon-item" key={`movie-commingSoon-${index}`}>
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

		<section className="home-content__cinema">
			<h2 className="home-content__cinema-title">Cinema Near You</h2>
			<ul className="home-content__cinema-list">
				{movieData?.cinema?.map((cinema, index) => {
					return <li className="home-content__cinema-item" key={`cinema-${index}`}>
						<div className="home-content__cinema-item-div">
							<p className="home-content__cinema-item-div-name">{cinema.properties.name.split(" ")[0]}</p>
							<p className="home-content__cinema-item-div-special">cinema</p>
						</div>
						<div className="home-content__cinema-item-div">
							<p className="home-content__cinema-item-loc">
								<FaLocationDot className="home-content__cinema-item-loc-img" />
								<span className="home-content__cinema-item-loc-amt">
									{(cinema.properties.distance / 1000).toFixed(2)} Kilometers
								</span>
							</p>
							<p className="home-content__cinema-item-name">
								{cinema.properties.name}
							</p>
							<p className="home-content__cinema-item-closing">
								Closed 10.00 PM
							</p>
						</div>

						<p className="home-content__cinema-item-stars">
							<FaStar className="home-content__cinema-item-star" />
							<span className="home-content__cinema-item-stars-amt">
								{((Math.random() * 10) / 2).toFixed(1)}
							</span>
						</p>
					</li>
				})}
			</ul>
		</section>
	</main>)
}