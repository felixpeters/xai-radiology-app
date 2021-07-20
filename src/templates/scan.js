import React from "react"
import { useState } from "react"
import { Link, graphql } from "gatsby"
import {
  ClipboardListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ScanImage from "../components/scanImage"
import NoduleList from "../components/noduleList.js"
import ModelCard from "../components/modelCard"
import ScanDetailsPanel from "../components/scanDetailsPanel"
import GlobalStateContext from "../components/globalStateContext"
import { useMixpanel } from "gatsby-plugin-mixpanel"
import initialState from "../components/state"
import MouseTracking from "../components/mouseTracking.js"

function Scan({ data, location }) {
  const mixpanel = useMixpanel()
  const scan = data.scansJson
  const state = location.state || initialState
  const [currentSlice, setCurrentSlice] = useState(120)
  const [scanInfoOpen, setScanInfoOpen] = useState(false)
  const [modelCardOpen, setModelCardOpen] = useState(false)

  const handleSliceChange = value => {
    setCurrentSlice(value)
  }
  return (
    <GlobalStateContext.Provider value={state}>
      <Layout>
        <MouseTracking></MouseTracking>
        <SEO title={"Scan #" + scan.id} />
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
                        to="/"
                        state={state}
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
                        to="#"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Scan #{scan.id}
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Scan #{scan.id}
                </h1>
              </div>
              <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                {state.showExplanations === "on" && (
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
                )}
                <button
                  onClick={() => {
                    mixpanel.track("open scan details")
                    setScanInfoOpen(true)
                  }}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ClipboardListIcon className="h-5 w-5 text-white mr-2" />
                  Scan details
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <ScanImage
                images={scan.images}
                currentSlice={currentSlice}
                setCurrentSlice={handleSliceChange}
              />
            </div>
            <div className="flex-1">
              <NoduleList
                data={scan.nodules}
                setCurrentSlice={handleSliceChange}
              />
            </div>
          </div>
          <ModelCard show={modelCardOpen} toggle={setModelCardOpen} />
          <ScanDetailsPanel
            scan={scan}
            show={scanInfoOpen}
            toggle={setScanInfoOpen}
          />
        </div>
      </Layout>
    </GlobalStateContext.Provider>
  )
}
export const query = graphql`
  query ScanbyId($scanId: String!) {
    scansJson(id: { eq: $scanId }) {
      id
      priority {
        code
        explanation
      }
      patient {
        name
        sex
        age
      }
      procedure {
        datetime
        name
        reason
      }
      images {
        raw
        overlay
        num_slices
        raw_slices
        overlay_slices
      }
      nodules {
        id
        main_slice
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
        }
        images {
          thumbnail
        }
      }
    }
  }
`
Scan.propTypes = {
  data: PropTypes.shape({
    scansJson: PropTypes.shape({
      id: PropTypes.string.isRequired,
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
      images: PropTypes.shape({
        raw: PropTypes.string,
        overlay: PropTypes.string,
        num_slices: PropTypes.number,
        raw_slices: PropTypes.string,
        overlay_slices: PropTypes.string,
      }),
      nodules: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          main_slice: PropTypes.string,
          images: PropTypes.shape({
            thumbnail: PropTypes.string,
          }),
          measurements: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              stat: PropTypes.number,
              unit: PropTypes.string,
            })
          ),
          classifications: PropTypes.shape({
            main: PropTypes.shape({
              ai: PropTypes.number,
              physician: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }),
}
export default Scan
