import { IoShieldCheckmark } from "react-icons/io5";
import { FaFileArrowDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Overlay({ show, setShow }) {
	const [tempShow, setTempShow] = useState(0)
	const navigator = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			setTempShow(show)
		}, 250)
	}, [show])

	return (<dialog className={`dialog-box${(show >= 1 && " showed" || " hidden")}`} open>
		<div className="dialog-box__background" onClick={() => {
			setShow(0)
			if (tempShow == 1) {
				setTimeout(() => {
					navigator("/")
				}, 300)
			}
		}}>
		</div>
		<div className="dialog-box__content">
			<div className="dialog-box__icon-wrapper">
				{(tempShow == 1 &&
					<IoShieldCheckmark className="dialog-box__icon" /> ||
					<FaFileArrowDown className="dialog-box__icon" />
				)}
			</div>
			<h2 className="dialog-box__content-title">
				{(tempShow == 1 &&
					"Your payment was successful" ||
					"Your ticket has been downloaded"
				)}
			</h2>
			<p className="dialog-box__content-text">
				{(tempShow == 1 &&
					"The transaction has gone through without any issues, and the amount has been securely processed and confirmed by the system." ||
					"A digital pass is now saved on your device, ready to be shown when required for entry, travel, or verification at the appropriate time."
				)}
			</p>
			<Link to={(tempShow == 1 && "/tickets" || "/")} onClick={() => setShow(0)}
				className="dialog-box__content-button">
				{(tempShow == 1 && "See E-Ticket" || "Back To Home")}
			</Link>
		</div>
	</dialog>)
}