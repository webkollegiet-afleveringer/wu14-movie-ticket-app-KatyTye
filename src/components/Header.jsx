import { BsBookmarkDash } from "react-icons/bs";
import { GoChevronLeft } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from "react-router";

function returnPrettyPageName(url) {
	switch (url) {
		case "/details":
			return "Movie Details"
		case "/seats":
			return "Select Seats"
		case "/explore":
			return "Explore Movies"
		case "/tickets":
			return "E-Ticket"
		case "/checkout":
			return "Checkout"
		case "/settings":
			return "Settings"
		case "/plan":
			return "Saved Plan"
	}
}

export default function Header() {
	const urlPath = useLocation()?.pathname

	return (<header className="top-content">
		{(urlPath == "/" && <>
			<div className="top-content__profile-wrapper">
				<p className="top-content__profile-message">Welcome Back,</p>
				<p className="top-content__profile-user">USER</p>
			</div>

			<Link to={"/profile"} className="top-content__profile-link">
				<img src="./images/Profile.png" alt="pofile image"
					className="top-content__profile-link-image" />
			</Link>
		</> || <>
				<Link className="top-content__page-last" to={"/"}>
					<GoChevronLeft className="top-content__page-last-icon" />
				</Link>

				<p className="top-content__page-name">{returnPrettyPageName(urlPath)}</p>

				{(urlPath == "/explore" && <IoIosSearch className="top-content__page-icon" />
					|| (urlPath == "/details" && <BsBookmarkDash className="top-content__page-icon" />
						|| <></>
					))}
			</>)}
	</header>)
}