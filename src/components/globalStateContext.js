import React, { createContext } from "react"
import initialState from "./state"

const GlobalStateContext = createContext(initialState)

export default GlobalStateContext
