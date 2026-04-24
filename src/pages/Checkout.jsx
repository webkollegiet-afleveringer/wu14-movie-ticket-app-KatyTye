import CardBackground from "../assets/icons/card_background.svg?react"
import MasterCard from "../assets/icons/mastercard.svg?react"
import { randomInt } from "../helpers/Converter"
import { useOutletContext } from "react-router"
import { useEffect, useState } from "react"
import { handlePurchase } from "../helpers/Purchase"

export default function Checkout() {
	const [showDialog, setShowDialog] = useOutletContext()
	const [selected, setSelected] = useState(0)
	const [cards, setCards] = useState([])
	const [data, setData] = useState({})

	useEffect(() => {
		setData(JSON.parse(localStorage.getItem("movie_temp")))
		setCards(JSON.parse(localStorage.getItem("movie_cards")))

		setTimeout(() => {
			localStorage.removeItem("movie_temp")
		}, 3000)
	}, [])

	function changeCard() {
		if (cards.length == selected) {
			setSelected(0)
		} else if (cards.length < selected) {
			setSelected(selected + 1)
		}
	}

	function handleSubmit(event) {
		event.preventDefault()
		const elements = event.target.elements

		if (handlePurchase(data, elements)) {
			setShowDialog(1)
		} else {
			setShowDialog(3)
		}
	}

	return (<main className="checkout-content">
		{!(data?.id) &&
			<p className="checkout-content__nothing">
				You dont have anything to checkout!
			</p>
			|| <>
				<section className="checkout-content__cards">
					<h2 className="checkout-content__cards-title">
						<span className="checkout-content__cards-title-text">
							Payment Method
						</span>
						<span className="checkout-content__cards-title-button"
							onClick={() => changeCard()}>
							Change
						</span>
					</h2>
					<ul className="checkout-content__cards-list">
						{cards?.map((card, index) => {
							return (<li key={"card-", index} className="checkout-content__cards-item">
								<div className="checkout-content__cards-item-top">
									<MasterCard className="checkout-content__cards-item-logo" />
									<div className="checkout-content__cards-item-wrapper">
										<p className="checkout-content__cards-item-top-text">Balance</p>
										<p className="checkout-content__cards-item-balance">${card?.balance}</p>
									</div>
									<CardBackground className="checkout-content__cards-item-bg" />
								</div>
								<div className="checkout-content__cards-item-bottom">
									<div className="checkout-content__cards-item-wrapper">
										<p className="checkout-content__cards-item-bottom-text">Card Holder</p>
										<p className="checkout-content__cards-item-holder">{card?.holder}</p>
									</div>
									<p className="checkout-content__cards-item-number">
										**** **** **** {card?.number?.split(" ")[3]}
									</p>
								</div>
							</li>)
						})}
					</ul>
				</section>

				<form className="checkout-content__form" onSubmit={evt => handleSubmit(evt)}>
					<h2 className="checkout-content__form-title">
						Payment Details
					</h2>

					<label htmlFor="email" className="checkout-content__form-label">
						<span className="checkout-content__form-label-text">
							Your Email
						</span>
						<input className="checkout-content__form-input"
							type="email" name="email" id="email" autoComplete="email"
							placeholder="youremailhere@example.com" required />
					</label>

					<label htmlFor="card" className="checkout-content__form-label">
						<span className="checkout-content__form-label-text">
							Cardholder Name
						</span>
						<input className="checkout-content__form-input"
							type="text" name="card" id="card" autoComplete="name" required
							placeholder="John Doe" defaultValue={cards[selected]?.holder} disabled />
					</label>

					<label htmlFor="cnumber" className="checkout-content__form-label">
						<span className="checkout-content__form-label-text">
							Card Number
						</span>
						<input className="checkout-content__form-input"
							type="text" name="cnumber" id="cnumber" autoComplete="name" required
							defaultValue={`**** **** **** ${cards[selected]?.number?.split(" ")[3]}`} disabled />
					</label>

					<div className="checkout-content__form-wrapper">
						<label htmlFor="date" className="checkout-content__form-label">
							<span className="checkout-content__form-label-text">
								Date
							</span>
							<input className="checkout-content__form-input"
								type="date" name="date" id="date" required />
						</label>
						<label htmlFor="cvv" className="checkout-content__form-label">
							<span className="checkout-content__form-label-text">
								CVV
							</span>
							<input className="checkout-content__form-input"
								type="text" name="cvv" id="cvv" placeholder="123" required />
						</label>
					</div>

					<button type="submit" className="checkout-content__form-submit">
						<span>
							Pay Now
						</span>
						<span></span>
						<span>
							${data?.price || 0}
						</span>
					</button>
				</form>
			</>}
	</main>)
}