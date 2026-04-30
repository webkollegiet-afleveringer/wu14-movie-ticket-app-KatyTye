import { Link, useLocation, useRouteLoaderData } from "react-router";
import { BsBookmarkDash } from "react-icons/bs";
import { GoChevronLeft } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

function returnPrettyPageName(url) {
	switch (true) {
		case url.includes("/details"):
			return "Movie Details"
		case url.includes("/seats"):
			return "Select Seats"
		case url.includes("/explore"):
			return "Explore Movies"
		case url.includes("/tickets"):
			return "E-Ticket"
		case url.includes("/checkout"):
			return "Checkout"
		case url.includes("/profile"):
			return "Settings"
		case url.includes("/plan"):
			return "Saved Plan"
	}
}

export default function Header() {
	const [enableSearch, setEnableSearch] = useState(false)
	const data = useRouteLoaderData("root")
	const urlPath = useLocation()?.pathname
	const lastPath = urlPath.split("/")[2]

	return (<header className="top-content">
		<div className="top-content__wrapper">
			{(urlPath == "/" && <>
				<div className="top-content__profile-wrapper">
					<p className="top-content__profile-message">Welcome Back,</p>
					<p className="top-content__profile-user">{data?.profile?.display}</p>
				</div>

				<Link to={"/profile"} className="top-content__profile-link">
					<img src="./images/Profile.png" alt="pofile image"
						className="top-content__profile-link-image" />
				</Link>
			</> || <>
					<Link className="top-content__page-last" to={(urlPath.includes("/seats") && `/details/${lastPath}` || "/")}>
						<GoChevronLeft className="top-content__page-last-icon" />
					</Link>

					<p className="top-content__page-name">{returnPrettyPageName(urlPath)}</p>

					{(urlPath.includes("/explore") && <IoIosSearch className={`top-content__page-icon${(
						enableSearch == true && " active" || ""
					)}`} />
						|| (urlPath.includes("/details") && <BsBookmarkDash className="top-content__page-icon" />
							|| ((urlPath.includes("/seats") || urlPath.includes("/checkout") || urlPath.includes("/tickets") || urlPath.includes("/profile") || urlPath.includes("/plan")) &&
								<div className="top-content__exbox"></div>
								||
								<></>)
						))}
				</>)}
		</div>

		{((urlPath == "/" || urlPath == "/explore") && <form id="search-form" className={`search-form${(
			(urlPath == "/" || (enableSearch == true && urlPath == "/explore")) && " active" || " hidden")}`}>
			<button type="submit" className="search-form__button">
				<IoIosSearch className="search-form__button-icon" />
			</button>
			<input type="text" name="search" id="search-form__input"
				placeholder="Search your favourite movie" required className="search-form__input" />
		</form>)}
	</header>)
}