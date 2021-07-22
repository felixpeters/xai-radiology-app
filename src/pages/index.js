import React, { createContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkList from "../components/worklist"
import GlobalStateContext from "../components/globalStateContext"
import { useMixpanel } from "gatsby-plugin-mixpanel"
import initialState from "../components/state"

export default function Home({ location }) {
  const state = location.state || initialState
  const params = new URLSearchParams(location.search)
  const pid = params.get("pid") || state.pid || "anonymous-user"
  const tic = params.get("tic") || state.tic || "anonymous-user"
  const mixpanel = useMixpanel()
  mixpanel.identify(pid)
  state["pid"] = pid
  state["tic"] = tic

  return (
    <GlobalStateContext.Provider value={state}>
      <Layout>
        <SEO title="Worklist" />
        <WorkList />
      </Layout>
    </GlobalStateContext.Provider>
  )
}
