import MasterCard from "../assets/icons/mastercard.svg?react"
import { useEffect, useState } from "react"

export default function Checkout() {
	const [cards, setCards] = useState([])
	const [data, setData] = useState({})

	useEffect(() => {
		setData(JSON.parse(localStorage.getItem("movie_temp")))
		setCards(JSON.parse(localStorage.getItem("movie_cards")))

		setTimeout(() => {
			localStorage.removeItem("movie_temp")
		}, 3000)
	}, [])

	console.log(cards)
	console.log(data)

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
						<span className="checkout-content__cards-title-button">
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

				<form className="checkout-content__form">
					<h2 className="checkout-content__form-title">
						Payment Details
					</h2>
				</form>
			</>}
	</main>)
}