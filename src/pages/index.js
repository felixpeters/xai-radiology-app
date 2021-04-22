import React from "react"
import Breadcrumbs from "../components/breadcrumbs"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkList from "../components/worklist"

const breadcrumbs = [{ name: "Worklist", href: "#", current: true }]

export default function Home() {
  return (
    <Layout>
      <SEO title="Worklist" />
      <Breadcrumbs pages={breadcrumbs} />
      <WorkList />
    </Layout>
  )
}
