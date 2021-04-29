import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumbs"
import SEO from "../components/seo"
import ScanImage from "../components/scan"
import NoduleList from "../components/nodules.js"

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
      <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="flex-1 bg-red-300">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Scan #{scan.id} - Patient {scan.patient.name}
            </h2>
            <ScanImage />
          </div>
          <div className="flex-1 bg-green-300">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Detected nodules
            </h2>
            <NoduleList />
          </div>
        </div>
      </div>
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
      procedure {
        datetime
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
      procecure: PropTypes.shape({
        datetime: PropTypes.string,
      }),
    }),
  }),
}
export default Scan
