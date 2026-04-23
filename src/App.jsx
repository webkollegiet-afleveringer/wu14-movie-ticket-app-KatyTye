import { fetchMovieFromID, initialMovieFetches } from "./helpers/MovieFetcher"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Details from "./pages/Details"
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import Layout from "./Layout"
import Loading from "./pages/Loading"
import Error from "./pages/Error"
import Seats from "./pages/Seats"
import Checkout from "./pages/Checkout"
import Tickets from "./pages/Tickets"

function App() {

	const BrowserRouter = createBrowserRouter([
		{
			id: "root",
			element: <Layout />,
			errorElement: <Error />,
			loader: initialMovieFetches,
			hydrateFallbackElement: <Loading />,
			children: [
				{
					index: true,
					element: <Home />
				},
				{
					path: "/explore",
					element: <Explore />
				},
				{
					id: "movie",
					loader: async ({ params }) => {
						return fetchMovieFromID(params.id)
					},
					children: [
						{
							path: "/details/:id",
							element: <Details />
						},
						{
							path: "/seats/:id",
							element: <Seats />
						}
					]
				},
				{
					path: "/checkout",
					element: <Checkout />
				},
				{
					path: "/tickets",
					element: <Tickets />
				}
			]
		}
	])

	return (
		<RouterProvider router={BrowserRouter} />
	)
}

export default App
