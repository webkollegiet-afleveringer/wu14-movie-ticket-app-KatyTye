import { Link, useRouteError } from "react-router";
import { MdError } from "react-icons/md";

export default function Error() {
	const err = useRouteError()

	return (
		<div className="error-box">
			<MdError className="error-icon" />
			<h2 className="error-title">
				Something went wrong
			</h2>
			<p className="error.message">
				{err?.statusText ?? err?.message ?? String(err)}
			</p>
			{(err?.statusText && err?.statusText == "Not Found" && <Link to={"/"} className="error-button">
				Return Home
			</Link> || <></>)}
		</div>
	)
}