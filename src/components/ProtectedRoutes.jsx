import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
  
  const tokenValue = localStorage.getItem('token')

  if( tokenValue ){ // Como saber si el usuario ya inicio sesion o no?
    return <Outlet/> // La vista
  }else {
    return <Navigate to='/login'/> // Navigate -> redireccion
  }
}

export default ProtectedRoutes
