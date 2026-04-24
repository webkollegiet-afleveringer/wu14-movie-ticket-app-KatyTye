import { useEffect, useState } from "react"
import { randomInt } from "../helpers/Converter"
import { useRouteLoaderData } from "react-router"

export default function Tickets() {
	const tickets = useRouteLoaderData("tickets")

	function returnRandomBarCode() {
		let bar = []
		while (bar.length <= 11) {
			bar.push(randomInt(2, 5))
		}

		return bar?.map((size, index) => <div className={`ticket-content__bar-line bar-width-${size}`}
			key={"bar-code-strip-" + index}></div>)
	}

	return (<main className="ticket-content tickets">
		<article className="ticket-content__article">
			<h2 className="ticket-content__article-title">
				Instruction
			</h2>
			<p className="ticket-content__article-text">
				Come to the cinema, show and scan the barcode to the space provided. Continue to comply with health protocols.
			</p>
		</article>

		<ul className="ticket-content__list">
			{tickets?.map((ticket, index) => {
				return <li key={"ticket-" + index} className="ticket-content__item">
					<div className="ticket-content__item-content">
						<p className="ticket-content__item-title">
							<span className="ticket-content__item-name">
								Film: {ticket?.name || "Unknown"}
								{/* Film: DATA CHECKOUT NEEDS NAME ALSO */}
							</span>
							<span className="ticket-content__item-type">
								e-ticket
							</span>
						</p>

						<div className="ticket-content__item-wrapper">
							<p className="ticket-content__item-seats">
								<span className="ticket-content__item-seats-text">
									Seats
								</span>
								<span className="ticket-content__item-seats-value">
									{ticket?.seats?.map(obj => obj).join(", ")
										|| "Standing"}
								</span>
							</p>
							<p className="ticket-content__item-time">
								<span className="ticket-content__item-time-text">
									Time
								</span>
								<span className="ticket-content__item-time-value">
									{ticket?.time || "Any"}
								</span>
							</p>
							<p className="ticket-content__item-order">
								<span className="ticket-content__item-order-text">
									Order
								</span>
								<span className="ticket-content__item-order-value">
									{ticket?.order || "000000"}
								</span>
							</p>
						</div>

						<div className="ticket-content__item-wrapper">
							<p className="ticket-content__item-date">
								<span className="ticket-content__item-date-text">
									Date
								</span>
								<span className="ticket-content__item-date-value">
									{ticket?.date
										|| "Today"}
								</span>
							</p>
							<p className="ticket-content__item-loc">
								<span className="ticket-content__item-loc-text">
									Location
								</span>
								<span className="ticket-content__item-loc-value">
									{ticket?.location || "Here"}
								</span>
							</p>
							<p className="ticket-content__item-payment">
								<span className="ticket-content__item-payment-text">
									Payment
								</span>
								<span className="ticket-content__item-payment-value">
									{(ticket?.status && "Successful" || "Failed")}
								</span>
							</p>
						</div>
					</div>
					<div className="ticket-content__bar">
						{returnRandomBarCode()}
					</div>
				</li>
			})}
		</ul>

		<button className="ticket-content__button">
			Download E-Ticket
		</button>
	</main>)
}