import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Shop from './Shop'
import Checkout from './Checkout'
import AllCollections from '../components/AllCollections.jsx'
import Docs from './Docs.jsx'
import SingleCollection from '../components/SingleCollection.jsx'
import NFTPage from './NFTPage.jsx'
import { useState } from "react";

const CustomRouter = () => {

  // shopping cart
  const [shoppingCart, setShoppingCart] = useState([])

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
            },
            {
              path: '/shop/collections/:collectionName',
              element: <SingleCollection />
            },
            {
              path: '/shop/collections/:collectionName/:nft',
              element: <NFTPage setShoppingCart={setShoppingCart} shoppingCart={shoppingCart}/>
            }
          ]
        },
        {
          path: '/checkout',
          element: <Checkout setShoppingCart={setShoppingCart} shoppingCart={shoppingCart}/>
        },
        {
          path: '/docs',
          element: <Docs />
        }
      ]);

      return <RouterProvider router={router} />
}

export default CustomRouter
