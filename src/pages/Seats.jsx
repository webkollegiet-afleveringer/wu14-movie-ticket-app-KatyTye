import { useRouteLoaderData } from "react-router"
import { convertDateToText } from "../helpers/Converter"

function returnDateAndTime() { /// FIX BELOW
	const today = new Date()
	let current = today.getDate()
	let dateArray = []
	let newDay = `
		${(current <= 9 && `0${current}` || current)}/${convertDateToText(today, true)}/${today.getFullYear()}
	`

	while (dateArray.length <= 10) {
		dateArray.push(newDay)
		current += 1
	}

	return ({
		dates: dateArray
	})
}

export default function Seats() {
	const movieData = useRouteLoaderData("root")

	console.log(returnDateAndTime())

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
						{(movieData?.cinema.map((cima, index) => {
							return <option className="seats-content__form-option"
								value={index} key={`option-cinema-${index}`}>
								{cima.properties.name}
							</option>
						}))}
					</select>
				</label>
			</div>
		</form>
	</main>)
}