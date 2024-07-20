import Cart from "./pages/Cart";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

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
]);



export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}