import React from "react"
import Breadcrumbs from "../components/breadcrumbs"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkList from "../components/worklist"

export default function Home() {
  return (
    <Layout>
      <SEO title="Worklist" />
      <WorkList />
    </Layout>
  )
}
