import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import Overlay from "./components/Overlay";

export default function Layout() {
	const [showDialog, setShowDialog] = useState(0)

	return (<>
		<Header />
		<Outlet />
		<Footer />
		<Overlay show={showDialog} setShow={setShowDialog} />
	</>)
}