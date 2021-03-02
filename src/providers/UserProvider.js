import React, { createContext } from "react"

export const UserContext = createContext()

export function UserProvider(props) {
  const currentUser = sessionStorage.getItem("currentUser")

  const getToken = () => {return}

  const getCurrentUser = () => {
    const user = sessionStorage.getItem("currentUser")
    if (!user) {
      return null
    }
    return JSON.parse(user)
  }

  return (
    <UserContext.Provider
      value={{
        getToken,
        getCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}