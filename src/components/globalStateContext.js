import React, { createContext } from "react"

const GlobalStateContext = createContext({
  pid: "anonymous_user",
})

export default GlobalStateContext
