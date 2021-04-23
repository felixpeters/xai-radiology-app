import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Breadcrumbs from "../components/Breadcrumbs"
import SEO from "../components/seo"

function Scan({ data }) {
  const scan = data.scansJson
  const breadcrumbs = [
    { name: "Worklist", href: "/", current: false },
    { name: "Scan #" + scan.id, href: "#", current: true },
  ]
  return (
    <Layout>
      <SEO title={"Scan #" + scan.id} />
      <Breadcrumbs pages={breadcrumbs} />
      <p>
        Scan #{scan.id} by patient {scan.patient.name}
      </p>
    </Layout>
  )
}
export const query = graphql`
  query ScanbyId($scanId: String!) {
    scansJson(id: { eq: $scanId }) {
      id
      patient {
        name
      }
    }
  }
`
Scan.propTypes = {
  data: PropTypes.shape({
    scansJson: PropTypes.shape({
      id: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }),
}
export default Scan
