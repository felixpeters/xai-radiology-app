import React, { createContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkList from "../components/worklist"
import UserStateContext from "../components/userContext"
import { useMixpanel } from "gatsby-plugin-mixpanel"

export default function Home({ location }) {
  const params = new URLSearchParams(location.search)
  const pid =
    params.get("pid") ||
    (location.state ? location.state.pid : null) ||
    "unknown"
  const mixpanel = useMixpanel()
  mixpanel.identify(pid)

  return (
    <UserStateContext.Provider value={pid}>
      <Layout>
        <SEO title="Worklist" />
        <WorkList />
      </Layout>
    </UserStateContext.Provider>
  )
}
