import { useOutletContext, useRouteLoaderData } from "react-router"
import { randomInt } from "../helpers/Converter"
import { useEffect, useState } from "react"
import { toPng } from 'html-to-image';
import { jsPDF } from "jspdf";

export default function Tickets() {
	const [showDialog, setShowDialog] = useOutletContext()
	const tickets = useRouteLoaderData("tickets")
	const [barCode, setBarCode] = useState([])

	function returnRandomBarCode() {
		let bar = []
		while (bar.length <= 30) {
			bar.push(randomInt(2, 7))
		}

		setBarCode(bar?.map((size, index) => <div className={`ticket-content__item-bar-line bar-width-${size}`}
			key={"bar-code-strip-" + index}></div>))
	}

	useEffect(() => {
		setTimeout(() => {
			returnRandomBarCode()
		}, 500)
	}, [barCode])

	async function downloadTickets() {
		setShowDialog(2)

		const el = document.querySelector("#tickets")

		const dataUrl = await toPng(el, { backgroundColor: '#fff', cacheBust: true });
		const pdf = new jsPDF({ unit: 'px', format: [el.offsetWidth, el.offsetHeight + 30] });
		pdf.addImage(dataUrl, 'PNG', 0, 0, el.offsetWidth, el.offsetHeight);
		pdf.save('export.pdf');
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

		<ul className="ticket-content__list" id="tickets">
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
							<div className="ticket-content__item-info">
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

							<div className="ticket-content__item-info">
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
										{ticket?.cinema || "Here"}
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
					</div>
					<div className="ticket-content__item-space">
					</div>
					<div className="ticket-content__item-bar">
						{barCode}
					</div>
				</li>
			})}
		</ul>

		<button className="ticket-content__button" onClick={() => downloadTickets()}>
			Download E-Ticket
		</button>
	</main>)
}