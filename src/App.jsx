import { fetchMovieFromID, initialMovieFetches } from "./helpers/MovieFetcher"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Details from "./pages/Details"
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import Layout from "./Layout"

function App() {

	const BrowserRouter = createBrowserRouter([
		{
			id: "root",
			element: <Layout />,
			loader: initialMovieFetches,
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
						}
					]
				}
			]
		}
	])

	return (
		<RouterProvider router={BrowserRouter} />
	)
}

export default App
