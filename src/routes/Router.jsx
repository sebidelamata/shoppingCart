import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Shop from './Shop'
import Checkout from './Checkout'
import AllCollections from '../components/AllCollections.jsx'

const CustomRouter = () => {
    const router = createBrowserRouter([
        {
          path: '/',
          element: <App />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/shop',
          element: <Shop />,
          children: [
            {
              index: true,
              element: <AllCollections />
            }
          ]
        },
        {
          path: '/checkout',
          element: <Checkout />
        },
      ]);

      return <RouterProvider router={router} />
}

export default CustomRouter
