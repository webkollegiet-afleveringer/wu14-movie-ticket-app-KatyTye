import { BsFillBookmarkDashFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { PiHouseFill } from "react-icons/pi";
import { FaCompass } from "react-icons/fa";
import { NavLink } from "react-router";

export default function Footer() {

	return (<footer className="bottom-content">
		<NavLink className={"bottom-content__link"} to={"/"}>
			<PiHouseFill className="bottom-content__link-icon" />
		</NavLink>

		<NavLink className={"bottom-content__link"} to={"/explore"}>
			<FaCompass className="bottom-content__link-icon" />
		</NavLink>

		<NavLink className={"bottom-content__link"} to={"/plan"}>
			<BsFillBookmarkDashFill className="bottom-content__link-icon" />
		</NavLink>

		<NavLink className={"bottom-content__link"} to={"/profile"}>
			<BiSolidUser className="bottom-content__link-icon" />
		</NavLink>
	</footer>)
}