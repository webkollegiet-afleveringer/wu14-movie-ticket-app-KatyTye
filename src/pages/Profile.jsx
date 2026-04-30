import { Link, useRouteLoaderData } from "react-router";
import TicketSVG from "../assets/icons/ticket.svg?react"
import GraphSVG from "../assets/icons/graph.svg?react"
import UserSVG from "../assets/icons/user.svg?react"
import { FaBell, FaTrash } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";
import { IoExit } from "react-icons/io5";


export default function Profile() {
	const data = useRouteLoaderData("root")

	return (<main className="profile-content">
		<div className="profile-content__top">
			<img src="./images/Profile.png" alt="image of profile"
				className="profile-content__top-image" />

			<div className="profile-content__wrapper">
				<p className="profile-content__wrapper-name">{data?.profile?.name}</p>
				<p className="profile-content__wrapper-title">Film Hunter</p>
			</div>

			<GoChevronRight className="profile-content__top-arrow" />
		</div>

		<div className="profile-content__line"></div>

		<section className="profile-content__section">
			<h2 className="profile-content__section-title">
				Account
			</h2>

			<button className="profile-content__section-button">
				<div className="profile-content__section-button-wrapper bg-db">
					<GraphSVG className="profile-content__section-button-img" />
				</div>

				<p className="profile-content__section-button-name">
					Personal Data
				</p>

				<GoChevronRight className="profile-content__section-button-arrow" />
			</button>

			<button className="profile-content__section-button">
				<div className="profile-content__section-button-wrapper bg-lb">
					<UserSVG className="profile-content__section-button-img" />
				</div>

				<p className="profile-content__section-button-name">
					Email & Payment
				</p>

				<GoChevronRight className="profile-content__section-button-arrow" />
			</button>

			<button className="profile-content__section-button">
				<div className="profile-content__section-button-wrapper bg-lr">
					<FaTrash className="profile-content__section-button-img" />
				</div>

				<p className="profile-content__section-button-name">
					Deactive Account
				</p>

				<GoChevronRight className="profile-content__section-button-arrow" />
			</button>
		</section>

		<div className="profile-content__line"></div>

		<section className="profile-content__section">
			<h2 className="profile-content__section-title">
				Privacy & Policy
			</h2>

			<button className="profile-content__section-button">
				<div className="profile-content__section-button-wrapper bg-db">
					<FaBell className="profile-content__section-button-img" />
				</div>

				<p className="profile-content__section-button-name">
					Notification
				</p>

				<GoChevronRight className="profile-content__section-button-arrow" />
			</button>

			<Link to={"/tickets"} className="profile-content__section-button">
				<div className="profile-content__section-button-wrapper bg-lb">
					<TicketSVG className="profile-content__section-button-img" />
				</div>

				<p className="profile-content__section-button-name">
					Your Ticket
				</p>

				<GoChevronRight className="profile-content__section-button-arrow" />
			</Link>

			<button className="profile-content__section-button">
				<div className="profile-content__section-button-wrapper bg-lr">
					<IoExit className="profile-content__section-button-img" />
				</div>

				<p className="profile-content__section-button-name">
					Logout
				</p>

				<GoChevronRight className="profile-content__section-button-arrow" />
			</button>
		</section>
	</main>)
}