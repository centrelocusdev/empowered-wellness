import { useState } from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PvtRoutes = () => {
  const navigate = useNavigate()
  const [redirectTo, setRedirectTo] = useState(window.location.pathname);

  let auth = Cookies.get('access-token')
  return auth ? <Outlet /> : <Navigate to='/login' state={{from: redirectTo}} />
}

export default PvtRoutes