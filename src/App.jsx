import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Layout from "./Layout"
import Details from "./pages/Details"
import { fetchMovieFromID } from "./helpers/MovieFetcher"

function App() {

	const BrowserRouter = createBrowserRouter([
		{
			id: "root",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />
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
