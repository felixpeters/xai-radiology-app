import React from "react"
import { useState } from "react"
import { Link, graphql } from "gatsby"
import {
  InformationCircleIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NoduleImage from "../components/noduleImage"
import NoduleClassification from "../components/noduleClassification"
import HeatmapExplanation from "../components/heatmapExplanation"
import initialState from "../components/state"
import GlobalStateContext from "../components/globalStateContext"
import SimilarNodulesPanel from "../components/similarNodulesPanel"
import ModelCard from "../components/modelCard"
import { useMixpanel } from "gatsby-plugin-mixpanel"

function Nodule({ data, location }) {
  const nodule = data.nodulesJson
  const scan = data.nodulesJson.scan
  const [state, setState] = useState(location.state || initialState)
  const [similarNodulesOpen, setSimilarNodulesOpen] = useState(false)
  const [modelCardOpen, setModelCardOpen] = useState(false)
  const mixpanel = useMixpanel()
  const handleClassification = event => {
    const { name, value } = event
    mixpanel.track("classify nodule", { noduleId: name, classification: value })
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <GlobalStateContext.Provider value={state}>
      <Layout>
        <SEO title={"Nodule #" + nodule.id + " | Scan #" + scan.id} />
        <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
          <div>
            <div>
              <nav className="sm:hidden" aria-label="Back">
                <Link
                  to="/"
                  state={state}
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeftIcon
                    className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Back
                </Link>
              </nav>
              <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <div>
                      <Link
                        state={state}
                        to="/"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Worklist
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Link
                        state={state}
                        to={"/scans/" + scan.id}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Scan #{scan.id}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Link
                        to="#"
                        state={state}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Nodule #{nodule.id}
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Nodule #{nodule.id}
                </h1>
              </div>
              <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                {state.showExplanations === "on" && (
                  <>
                    <button
                      onClick={() => {
                        mixpanel.track("open model card")
                        setModelCardOpen(true)
                      }}
                      type="button"
                      className="mr-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <InformationCircleIcon className="h-5 w-5 text-white mr-2" />
                      Model card
                    </button>
                    <button
                      onClick={() => {
                        mixpanel.track("open similar nodules panel")
                        setSimilarNodulesOpen(true)
                      }}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <SearchIcon className="h-5 w-5 text-white mr-2" />
                      Similar nodules
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <NoduleImage images={nodule.images} />
              {state.showExplanations === "on" && <HeatmapExplanation />}
            </div>
            <div className="flex-1">
              <NoduleClassification
                data={nodule}
                state={state}
                scanId={scan.id}
                handleClassification={handleClassification}
              />
            </div>
          </div>
          <SimilarNodulesPanel
            nodules={nodule.similar}
            show={similarNodulesOpen}
            toggle={setSimilarNodulesOpen}
          />
          <ModelCard show={modelCardOpen} toggle={setModelCardOpen} />
        </div>
      </Layout>
    </GlobalStateContext.Provider>
  )
}
export const query = graphql`
  query NoduleById($noduleId: String!) {
    nodulesJson(id: { eq: $noduleId }) {
      id
      main_slice
      similar {
        id
        dist
        diameter
        area
        volume
        malignancy
        thumbnail
        diagnosis
        diagnosisMethod
      }
      scan {
        id
        patient {
          name
          sex
          age
        }
        procedure {
          name
          datetime
          reason
        }
        priority {
          code
          explanation
        }
      }
      measurements {
        name
        stat
        unit
      }
      classifications {
        main {
          ai
          physician
        }
        additional {
          classification {
            name
            marks
          }
          value
        }
      }
      images {
        thumbnail
        num_slices
        slices
        heatmaps
      }
    }
  }
`
Nodule.propTypes = {
  data: PropTypes.shape({
    nodulesJson: PropTypes.shape({
      scan: PropTypes.shape({
        id: PropTypes.string.isRequired,
        main_slice: PropTypes.string,
        similar: PropTypes.shape({
          id: PropTypes.string,
          dist: PropTypes.number,
          diameter: PropTypes.number,
          area: PropTypes.number,
          volume: PropTypes.number,
          malignancy: PropTypes.number,
          thumbnail: PropTypes.string,
          diagnosis: PropTypes.string,
          diagnosisMethod: PropTypes.string,
        }),
        priority: PropTypes.shape({
          code: PropTypes.string,
          explanation: PropTypes.string,
        }),
        patient: PropTypes.shape({
          name: PropTypes.string,
          sex: PropTypes.string,
          age: PropTypes.number,
        }),
        procedure: PropTypes.shape({
          name: PropTypes.string,
          datetime: PropTypes.string,
          reason: PropTypes.string,
        }),
      }),
      id: PropTypes.string.isRequired,
      images: PropTypes.shape({
        thumbnail: PropTypes.string,
        num_slices: PropTypes.number,
        slices: PropTypes.string,
        heatmaps: PropTypes.string,
      }),
      measurements: PropTypes.arrayOf({
        name: PropTypes.string,
        stat: PropTypes.number,
        unit: PropTypes.string,
      }),
      classifications: PropTypes.shape({
        main: PropTypes.shape({
          ai: PropTypes.number,
          physician: PropTypes.string,
        }),
        additional: PropTypes.arrayOf({
          classification: PropTypes.shape({
            name: PropTypes.string,
            marks: PropTypes.arrayOf({}),
          }),
          value: PropTypes.string,
        }),
      }),
    }),
  }),
}
export default Nodule
