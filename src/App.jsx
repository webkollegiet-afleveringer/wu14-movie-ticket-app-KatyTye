import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Layout from "./Layout"

function App() {

	const BrowserRouter = createBrowserRouter([
		{
			id: "root",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />
				}
			]
		}
	])

	return (
		<RouterProvider router={BrowserRouter} />
	)
}

export default App
