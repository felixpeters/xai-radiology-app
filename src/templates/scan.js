import React from "react"
import { useState } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumbs"
import SEO from "../components/seo"
import ScanImage from "../components/scan"
import NoduleList from "../components/nodules.js"
import ScanInfo from "../components/scanInfo.js"
import ScanHeader from "../components/scanHeader.js"

function Scan({ data }) {
  const scan = data.scansJson
  const [scanInfoOpen, setScanInfoOpen] = useState(false)
  return (
    <Layout>
      <SEO title={"Scan #" + scan.id} />
      <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
        <ScanHeader data={scan} />
        <div className="flex flex-col mt-4 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="flex-1 bg-red-300">
            <ScanImage />
          </div>
          <div className="flex-1 bg-green-300">
            <NoduleList />
          </div>
        </div>
        <ScanInfo show={scanInfoOpen} />
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
