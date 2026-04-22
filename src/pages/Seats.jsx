import { convertDateToText, returnDateAndTime } from "../helpers/Converter"
import { useRouteLoaderData } from "react-router"

export default function Seats() {
	const movieData = useRouteLoaderData("root")

	return (<main className="seats-content">
		<form className="seats-content__form">
			<label for="cinema" className="seats-content__form-label">
				<span className="seats-content__form-label-text">
					Cinema
				</span>
				<select name="cinema" id="cinema" className="seats-content__form-select">
					{(movieData?.cinema.map((cima, index) => {
						return <option className="seats-content__form-option"
							value={index} key={`option-cinema-${index}`}>
							{cima.properties.name}
						</option>
					}))}
				</select>
			</label>
			<div>
				<label for="date" className="seats-content__form-label">
					<span className="seats-content__form-label-text">
						Date
					</span>
					<select name="date" id="date" className="seats-content__form-select">
						{(returnDateAndTime()?.dates?.map((date, index) => {
							return <option className="seats-content__form-option"
								value={index} key={`option-dates-${index}`}>
								{date.replaceAll("/", " ")}
							</option>
						}))}
					</select>
				</label>

				<label for="time" className="seats-content__form-label">
					<span className="seats-content__form-label-text">
						Time
					</span>
					<select name="time" id="time" className="seats-content__form-select">
						{(returnDateAndTime()?.times?.map((time, index) => {
							if (index <= 6 || index >= 22 || `${index / 2}`.includes(".")) { return }
							return <option className="seats-content__form-option"
								value={index} key={`option-time-${index}`}>
								{time}
							</option>
						}))}
					</select>
				</label>
			</div>
		</form>
	</main>)
}