import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Shop from './Shop'
import Checkout from './Checkout'

const CustomRouter = () => {
    const router = createBrowserRouter([
        {
          path: '/',
          element: <App />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/shop',
          element: <Shop />
        },
        {
          path: '/checkout',
          element: <Checkout />
        },
      ]);

      return <RouterProvider router={router} />
}

export default CustomRouter
