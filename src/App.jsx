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
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Protected from "./features/Protected";
import { useEffect } from "react";
import { fetchCartByUserIdAsync } from "./utils/cartSlice";
import { selectLoggedInUser } from "./utils/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
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
    element: <Protected><Cart></Cart></Protected>
  },
  {
    path : "/checkout",
    element: <Protected><Checkout></Checkout></Protected>
  },
  {
    path : "/products/:id",
    element: <Protected><ProductDetailPage/></Protected>
  },
]);

export default function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
      dispatch(fetchCartByUserIdAsync(user.id))
    }
    
  },[dispatch, user])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}