import React, { createContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkList from "../components/worklist"
import GlobalStateContext from "../components/globalStateContext"
import { useMixpanel } from "gatsby-plugin-mixpanel"
import initialState from "../components/state"
import createPersistedState from "use-persisted-state"
const useAppState = createPersistedState("app")

export default function Home({ location }) {
  const params = new URLSearchParams(location.search)
  const pid = params.get("pid")
  const tic = params.get("tic")
  const mixpanel = useMixpanel()
  const [state, setState] = useAppState(initialState)
  setState("pid", pid)
  setState("tic", tic)
  mixpanel.identify(pid)

  return (
    <GlobalStateContext.Provider value={state}>
      <Layout>
        <SEO title="Worklist" />
        <WorkList />
      </Layout>
    </GlobalStateContext.Provider>
  )
}
