import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser, signOutAsync } from "../utils/authSlice"
import { Navigate } from "react-router-dom"

const LogOut = () => {
    const user = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(signOutAsync(user.id))
    }, [dispatch])
  return (
    <div>
    {!user && <Navigate to='/login' replace={true}/>}
    </div>
  )
}
export default LogOut