import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path : "/signup",
    element: <Signup></Signup>
  },
  {
    path : "/cart",
    element: <Cart></Cart>
  },
  {
    path : "/checkout",
    element: <Checkout></Checkout>
  },
  {
    path : "/product-details",
    element: <ProductDetailPage/>
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}