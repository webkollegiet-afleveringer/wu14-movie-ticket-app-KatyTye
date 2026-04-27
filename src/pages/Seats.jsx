import { convertDateToText, randomInt, returnDateAndTime } from "../helpers/Converter"
import { useNavigate, useParams, useRouteLoaderData } from "react-router"
import MovieScreen from "../assets/icons/screen.svg?react"
import { useState } from "react"

export default function Seats() {
	const movie = useRouteLoaderData("movie")

	const [occupiedSeats, setOccupiedSeats] = useState(movie?.filled_seats || [])
	const [selectedSeats, setSelectedSeats] = useState([])
	const movieData = useRouteLoaderData("root")
	const Navigator = useNavigate()
	const movieID = useParams().id
	let loadedSeats = 0

	const seatLayout = [
		[{ rows: 3 }, { rows: 4 }, { rows: 4 }, { rows: 4 }, { rows: 4 }, { rows: 3 }],
		[{ rows: 3 }, { rows: 4 }, { rows: 4 }, { rows: 4 }, { rows: 4 }, { rows: 3 }]
	]

	function toggleSeat(evt) {
		let number = Number(evt.target.getAttribute("data-set-seat")) || 1
		if (!occupiedSeats.includes(number)) {
			if (selectedSeats.includes(number)) {
				const indexOfValue = selectedSeats.indexOf(number)
				setSelectedSeats(prev => [
					...prev.slice(0, indexOfValue),
					...prev.slice(indexOfValue + 1)
				]);
			} else {
				setSelectedSeats(prev => [...prev, number])
			}
		}
	}

	function returnSeatButtons(amount) {
		let returnArray = []

		for (let i = 0; i < amount; i++) {
			loadedSeats += 1

			returnArray.push(
				<button className={`seats-content__form-seat${(selectedSeats.includes(loadedSeats) &&
					" selected" || "")}`} data-set-seat={loadedSeats} key={"form-seat-", loadedSeats} onClick={evt => toggleSeat(evt)}
					type="button" disabled={occupiedSeats.includes(loadedSeats)}>
				</button>)
		}

		return returnArray
	}

	function handleFormSubmit(event) {
		event.preventDefault()

		if (selectedSeats.length == 0) { return }

		let elm = event.target.elements

		localStorage.setItem("movie_temp", JSON.stringify({
			id: movieID,
			name: movie.original_title,
			price: randomInt(9, 29),
			cinema: elm[0].value,
			date: elm[1].value,
			time: elm[2].value,
			seats: selectedSeats
		}))

		Navigator("/checkout")
	}

	return (<main className="seats-content">
		<form className="seats-content__form" onSubmit={evt => handleFormSubmit(evt)}>
			<label htmlFor="cinema" className="seats-content__form-label">
				<span className="seats-content__form-label-text">
					Cinema
				</span>
				<select name="cinema" id="cinema" className="seats-content__form-select">
					{(movieData?.cinema.map((cima, index) => {
						return <option className="seats-content__form-option"
							value={cima.properties.name} key={`option-cinema-${index}`}>
							{cima.properties.name}
						</option>
					}))}
				</select>
			</label>

			<div className="seats-content__form-wrapper">
				<label htmlFor="date" className="seats-content__form-label">
					<span className="seats-content__form-label-text">
						Date
					</span>
					<select name="date" id="date" className="seats-content__form-select">
						{(returnDateAndTime()?.dates?.map((date, index) => {
							return <option className="seats-content__form-option"
								value={date} key={`option-dates-${index}`}>
								{date.replaceAll("/", " ")}
							</option>
						}))}
					</select>
				</label>

				<label htmlFor="time" className="seats-content__form-label">
					<span className="seats-content__form-label-text">
						Time
					</span>
					<select name="time" id="time" className="seats-content__form-select">
						{(returnDateAndTime()?.times?.map((time, index) => {
							if (index <= 6 || index >= 22 || `${index / 2}`.includes(".")) { return }
							return <option className="seats-content__form-option"
								value={time} key={`option-time-${index}`}>
								{time}
							</option>
						}))}
					</select>
				</label>
			</div>

			<MovieScreen className="seats-content__form-screen" />

			<div className="seats-content__form-seats">
				{seatLayout.map((box, idx) => {
					return (<div className={`seats-content__form-seats-${(idx == 0 && "left" || "right")}`}
						key={"form-side-", idx}>
						{box.map((seat, index) => {
							return (seat.rows == 3 && <div className={`seats-content__form-seats-${(idx == 0 && "left" || "right")}-special`}
								key={"seat-row-", index}>
								{returnSeatButtons(seat.rows)}
							</div> || <div className={`seats-content__form-seats-${(idx == 0 && "left" || "right")}-middle`}
								key={"seat-row-", index}>
									{returnSeatButtons(seat.rows)}
								</div>)
						})}
					</div>)
				})}
			</div>

			<div className="seats-content__form-states">
				<p className="seats-content__form-state select">Selected</p>
				<p className="seats-content__form-state reserved">Reserved</p>
				<p className="seats-content__form-state">Available</p>
			</div>

			<button type="submit" className="seats-content__form-submit">
				Checkout
			</button>
		</form>
	</main>)
}