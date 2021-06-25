import React, { useState, createContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkList from "../components/worklist"
import UserStateContext from "../components/userContext"

export default function Home({ location }) {
  const params = new URLSearchParams(location.search)
  const pid = params.get("pid")
  const [user, setUser] = useState(pid)

  return (
    <UserStateContext.Provider value={user}>
      <Layout>
        <SEO title="Worklist" />
        <WorkList />
      </Layout>
    </UserStateContext.Provider>
  )
}
