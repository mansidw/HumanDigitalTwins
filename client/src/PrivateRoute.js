import React,{useContext} from "react"
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./contexts/EmailContext"
import { UserContext } from "./contexts/UserProvider"

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth()
//   const user = useContext(UserContext)
//   return (
//     <Route {...rest}
//       render={props => {
//         return currentUser||user ? <Component {...props} /> : <Navigate to="/login" />
//       }}
//     ></Route>
//   )
// }

const PrivateRoute = () => {
  const { currentUser } = useAuth()
  const user = useContext(UserContext)
  return user||currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;