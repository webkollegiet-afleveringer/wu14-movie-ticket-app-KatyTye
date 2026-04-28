import { useEffect, useState } from "react"
import { FaStar, FaTrash } from "react-icons/fa"
import { returnDateAndTime } from "../helpers/Converter"

export default function Plan() {
	const [selected, setSelected] = useState(0)
	const [amount, setAmount] = useState(0)
	const [plans, setPlans] = useState([])

	useEffect(() => {
		if (localStorage.getItem("mymovies-plan")) {
			setPlans(JSON.parse(localStorage.getItem("mymovies-plan")) || [])
		}
	}, [])

	useEffect(() => {
		setAmount(plans[selected]?.people || 0)
	}, [selected])

	return (<main className="plan-content plan">
		{(plans.length == 0 && <p className="plan-content__error">
			You dont have any plans.
		</p> ||
			<ol className="plan-content__list">
				{plans?.map((plan, index) => {
					return <li className={`plan-content__item${(selected == index && " open" || " closed")}`}
						key={`plan-${index}`}>
						<h2 className="plan-content__item-title">
							<span className="plan-content__item-number">
								{index + 1}.
							</span>
							<span className="plan-content__item-text">
								{plan?.date.replaceAll("/", " ")}
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
									{plan?.rated}
								</span>
							</p>
						</div>
						<form className="plan-content__item-form">
							<label htmlFor="cinema" className="plan-content__item-cinema">
								<span className="plan-content__item-cinema-text">
									Cinema
								</span>
								<select name="cinema" id="cinema"
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
									<select name="date" id="date"
										className="plan-content__item-date-select">
										<option value={plan?.date}>
											{plan?.date}
										</option>
									</select>
								</label>
								<label htmlFor="time" className="plan-content__item-time">
									<span className="plan-content__item-time-text">
										Time
									</span>
									<select name="time" id="time"
										className="plan-content__item-time-select">
										{(returnDateAndTime()?.times?.map((time, index) => {
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
									<button type="button"
										className="plan-content__item-person-up"></button>
									<p className="plan-content__item-person-amount">
										{amount}
									</p>
									<button type="button"
										className="plan-content__item-person-down"></button>
								</div>
							</div>
							<div className="plan-content__form-wrapper">
								<button type="submit"
									className="plan-content__form-checkout">Checkout</button>
								<button type="button" className="plan-content__form-delete">
									<FaTrash className="plan-content__form-delete-icon" />
								</button>
							</div>
						</form>
					</li>
				}) || <></>}
			</ol>)}
	</main>)
}