import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase"
export const UserContext = createContext({user: null})

export default ({children}) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                const { displayName, email ,uid}  = user;
                setUser({
                    displayName,
                    email,
                    uid
                })
            }
            
        })
    },[])
    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    )
}