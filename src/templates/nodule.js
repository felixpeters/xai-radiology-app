import React from "react"
import classnames from "classnames"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon, ArrowCircleRightIcon } from "@heroicons/react/outline"
import { Link, graphql } from "gatsby"
import {
  ClipboardListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Nodule({ data }) {
  const nodule = data.nodulesJson
  const scan = data.nodulesJson.scan
  const [scanInfoOpen, setScanInfoOpen] = useState(false)
  return (
    <Layout>
      <SEO title={"Nodule #" + nodule.id + " | Scan #" + scan.id} />
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
              <button
                type="button"
                className="mr-4 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                Active AI: Nodule detection & classification
              </button>
              <button
                onClick={() => setScanInfoOpen(true)}
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
            <p>Image goes here</p>
          </div>
          <div className="flex-1">
            <p>Other content goes here</p>
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
                      <div className="mt-4 relative flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                                <dt className="text-sm font-medium text-gray-500">
                                  Priority
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                  <span
                                    className={classnames(
                                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                      {
                                        "bg-red-100 text-red-800":
                                          scan.priority.code == "High",
                                        "bg-yellow-100 text-yellow-800":
                                          scan.priority.code == "Medium",
                                        "bg-green-100 text-green-800":
                                          scan.priority.code == "Low",
                                      }
                                    )}
                                  >
                                    {scan.priority.code}:{" "}
                                    {scan.priority.explanation}
                                  </span>
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                                <dt className="text-sm font-medium text-gray-500">
                                  Patient
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                  <div className="flex flex-col">
                                    <div className="text-sm text-gray-900">
                                      {scan.patient.name}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.patient.sex}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.patient.age} years
                                    </div>
                                    <button
                                      type="button"
                                      className="inline-flex w-40 items-center mt-2 px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                      <ArrowCircleRightIcon className="h-4 w-4 text-white mr-2" />
                                      Open full EHR
                                    </button>
                                  </div>
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                                <dt className="text-sm font-medium text-gray-500">
                                  Procedure
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                  <div className="flex flex-col">
                                    <div className="text-sm text-gray-900">
                                      {scan.procedure.name}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.procedure.datetime}
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {scan.procedure.reason}
                                    </div>
                                  </div>
                                </dd>
                              </div>
                            </dl>
                          </div>
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
  query NoduleById($noduleId: String!) {
    nodulesJson(id: { eq: $noduleId }) {
      id
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
        diameter
        area
        volume
      }
      classifications {
        main {
          ai
          physician
        }
      }
      image
    }
  }
`
Nodule.propTypes = {
  data: PropTypes.shape({
    nodulesJson: PropTypes.shape({
      scan: PropTypes.shape({
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
      }),
      id: PropTypes.string.isRequired,
      image: PropTypes.string,
      measurements: PropTypes.shape({
        diameter: PropTypes.number,
        area: PropTypes.number,
        volume: PropTypes.number,
      }),
      classifications: PropTypes.shape({
        main: PropTypes.shape({
          ai: PropTypes.number,
          physician: PropTypes.string,
        }),
      }),
    }),
  }),
}
export default Nodule