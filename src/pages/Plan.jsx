import { FaMinus, FaPlus, FaStar, FaTrash } from "react-icons/fa"
import { randomInt, returnDateAndTime } from "../helpers/Converter"
import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"

export default function Plan() {
	const [selected, setSelected] = useState(0)
	const [amount, setAmount] = useState(1)
	const [cinema, setCinema] = useState(0)
	const [plans, setPlans] = useState([])
	const [dates, setDate] = useState("")
	const [times, setTime] = useState("")
	const Navigator = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("mymovies-plan")) {
			const newData = JSON.parse(localStorage.getItem("mymovies-plan"))
			setPlans(newData || [])

			if (newData?.length && newData?.length >= 1) {
				setAmount(newData[0]?.people)
				setDate(newData[0]?.date)
				setTime(newData[0]?.time)
			}
		}
	}, [])

	useEffect(() => {
		if (plans.length >= 1) {
			setAmount(plans[selected]?.people || 1)
			setDate(plans[selected]?.date)
			setTime(plans[selected]?.time)
		}
	}, [selected])

	function deletePlan() {
		localStorage.setItem("mymovies-plan", JSON.stringify(plans.filter((plan, idx) => idx != selected)))
		setPlans(plans.filter((plan, idx) => idx != selected))
		setSelected(0)
	}

	function checkoutPlan(event) {
		event.preventDefault()

		const elm = event.target.elements
		const data = plans[selected]

		localStorage.setItem("movie_temp", JSON.stringify({
			id: data?.movie,
			name: data?.name,
			price: (randomInt(9, 29) * amount),
			cinema: data?.cinemas[cinema],
			date: dates,
			time: times,
			seats: data?.seats
		}))

		Navigator("/checkout")
	}

	return (<main className="plan-content plan">
		{(plans.length == 0 && <p className="plan-content__error">
			You dont have any plans.
		</p> ||
			<ol className="plan-content__list">
				{plans?.map((plan, index) => {
					return <li className={`plan-content__item${(selected == index && " open" || " closed")}`}
						key={`plan-${index}`} onClick={() => setSelected(index)}>
						<h2 className="plan-content__item-title">
							<span className="plan-content__item-number">
								{index + 1}.
							</span>
							<span className="plan-content__item-text">
								{plan?.dates[0].replaceAll("/", " ")}
							</span>
						</h2>

						<div className="plan-content__item-profile">
							<img className="plan-content__item-profile-image"
								src="./images/Profile.png" alt="profile image" />
							<div className="plan-content__item-profile-wrapper">
								<p className="plan-content__item-profile-tag">
									{plan?.tag}
								</p>
								<p className="plan-content__item-profile-name">
									{plan?.name}
								</p>
								<p className="plan-content__item-profile-time">
									{plan?.duration}
								</p>
							</div>
							<p className="plan-content__item-profile-rated">
								<FaStar className="plan-content__item-profile-rated-star" />
								<span className="plan-content__item-profile-rated-text">
									{plan?.rated.toFixed(1)}
								</span>
							</p>
						</div>
						<form className="plan-content__item-form"
							onSubmit={evt => checkoutPlan(evt)}>
							<label htmlFor="cinema" className="plan-content__item-cinema">
								<span className="plan-content__item-cinema-text">
									Cinema
								</span>
								<select name="cinema" id="cinema" onChange={evt => setCinema(evt?.target?.value)}
									className="plan-content__item-cinema-select">
									{plan?.cinemas?.map((cinema, index) => {
										return <option key={`cinema-${index}`} value={cinema}>
											{cinema}
										</option>
									})}
								</select>
							</label>
							<div className="plan-content__item-form-wrapper">
								<label htmlFor="date" className="plan-content__item-date">
									<span className="plan-content__item-date-text">
										Date
									</span>
									<select name="date" id="date" onChange={evt => setDate(evt?.target?.value)}
										className="plan-content__item-date-select">
										{(plan?.dates?.map((date, index) => {
											return <option value={date} key={`option-date-${index}`}>
												{date}
											</option>
										}))}
									</select>
								</label>
								<label htmlFor="time" className="plan-content__item-time">
									<span className="plan-content__item-time-text">
										Time
									</span>
									<select name="time" id="time" onChange={evt => setTime(evt?.target?.value)}
										className="plan-content__item-time-select">
										{(plan?.times?.map((time, index) => {
											if (index <= 6 || index >= 22 || `${index / 2}`.includes(".")) { return }
											return <option value={time} key={`option-time-${index}`}>
												{time}
											</option>
										}))}
									</select>
								</label>
								<label htmlFor="seats" className="plan-content__item-seats">
									<span className="plan-content__item-seats-text">
										Seats
									</span>
									<select name="seats" id="seats"
										className="plan-content__item-seats-select">
										<option key={`option-seats`} value={JSON.stringify(plan?.seats)}>
											{plan?.seats?.map(seat => seat).join(", ")}
										</option>
									</select>
								</label>
								<div className="plan-content__item-person-wrapper">
									<p className="plan-content__item-person-title">Person</p>
									<div className="plan-content__item-person-div">
										<div className="plan-content__item-person-down"
											onClick={() => amount >= 2 && setAmount(amount - 1)}>
											<FaMinus />
										</div>
										<p className="plan-content__item-person-amount">
											{amount}
										</p>
										<div className="plan-content__item-person-up"
											onClick={() => setAmount(amount + 1)}>
											<FaPlus />
										</div>
									</div>
								</div>
							</div>
							<div className="plan-content__form-wrapper">
								<button className="plan-content__form-checkout"
									type="submit"><span>
										Checkout
									</span></button>
								<button type="button" className="plan-content__form-delete"
									onClick={() => deletePlan()}>
									<FaTrash className="plan-content__form-delete-icon" />
								</button>
							</div>
						</form>
					</li>
				}) || <></>}
			</ol>)}
	</main>)
}