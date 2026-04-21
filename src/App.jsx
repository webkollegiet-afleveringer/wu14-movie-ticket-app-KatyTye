import { fetchMovieFromID, initialMovieFetches } from "./helpers/MovieFetcher"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Details from "./pages/Details"
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import Layout from "./Layout"
import Loading from "./pages/Loading"
import Error from "./pages/Error"

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
