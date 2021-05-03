import React from "react"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import { Link, graphql } from "gatsby"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ScanImage from "../components/scanImage"
import NoduleList from "../components/noduleList.js"

function Scan({ data }) {
  const scan = data.scansJson
  const [scanInfoOpen, setScanInfoOpen] = useState(false)
  return (
    <Layout>
      <SEO title={"Scan #" + scan.id} />
      <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
        <div>
          <div>
            <nav className="sm:hidden" aria-label="Back">
              <Link
                to="/"
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
                Scan #{scan.id} - Patient {scan.patient.name}
              </h1>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <button
                onClick={() => setScanInfoOpen(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Scan details
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <ScanImage images={scan.images} />
          </div>
          <div className="flex-1">
            <NoduleList data={scan.nodules}/>
          </div>
        </div>
        <Transition.Root show={scanInfoOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 overflow-hidden"
            open={scanInfoOpen}
            onClose={setScanInfoOpen}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Dialog.Overlay className="absolute inset-0" />

              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Scan details
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => setScanInfoOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div
                            className="h-full border-2 border-dashed border-gray-200"
                            aria-hidden="true"
                          />
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
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
      images {
        raw
        overlay
      }
      nodules {
        id
        measurements {
          diameter
          area
          volume
        }
        classifications {
          ai
          physician
        }
        image
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
      images: PropTypes.shape({
        raw: PropTypes.string,
        overlay: PropTypes.string,
      }),
      nodules: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        image: PropTypes.string,
        measurements: PropTypes.shape({
          diameter: PropTypes.number,
          area: PropTypes.number,
          volume: PropTypes.number,
        }),
        classifications: PropTypes.shape({
          ai: PropTypes.number,
          physician: PropTypes.string,
        }),
      }),
    }),
  }),
}
export default Scan
