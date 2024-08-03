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
import Protected from "./features/Protected";
import { useEffect } from "react";
import { fetchCartByUserIdAsync } from "./utils/cartSlice";
import { selectLoggedInUser } from "./utils/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./utils/userSlice";
import LogOut from "./pages/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ProtectedAdmin from "./features/ProtectedAdmin"
import AdminHome from "./pages/AdminHome"
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
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
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
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
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path : "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path : "/orders",
    element: <UserOrdersPage></UserOrdersPage>
  },
  {
    path : "/profile",
    element: <UserProfilePage></UserProfilePage>
  },
  {
    path : "/logOut",
    element: <LogOut></LogOut>
  },
  {
    path : "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path : "*",
    element : <PageNotFound></PageNotFound>
  }
]);

export default function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
      dispatch(fetchCartByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
    
  },[dispatch, user])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}