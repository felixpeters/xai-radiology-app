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
import ScanImage from "../components/scanImage"
import NoduleList from "../components/noduleList.js"
import ModelOverview from "../components/modelOverview"
import ModelValidation from "../components/modelValidation"
import ModelDatasets from "../components/modelDataset"
import ModelPerformance from "../components/modelPerformance"
import UserStateContext from "../components/userContext"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Scan({ data, location }) {
  const scan = data.scansJson
  const pid = (location.state ? location.state.pid : null) || "unknown"
  const [scanInfoOpen, setScanInfoOpen] = useState(false)
  const [moduleInfoOpen, setModuleInfoOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("Overview")
  const tabs = [
    { name: "Overview", href: "#", current: true },
    { name: "Clinical validation", href: "#", current: false },
    { name: "Datasets", href: "#", current: false },
    { name: "Performance", href: "#", current: false },
  ]
  return (
    <UserStateContext.Provider value={pid}>
      <Layout>
        <SEO title={"Scan #" + scan.id} />
        <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
          <div>
            <div>
              <nav className="sm:hidden" aria-label="Back">
                <Link
                  to="/"
                  state={{ pid: pid }}
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
                        state={{ pid: pid }}
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
                        state={{ pid: pid }}
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
                <button
                  onClick={() => setModuleInfoOpen(true)}
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
              <ScanImage images={scan.images} />
            </div>
            <div className="flex-1">
              <NoduleList data={scan.nodules} />
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
          <Transition.Root show={moduleInfoOpen} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto"
              open={moduleInfoOpen}
              onClose={setModuleInfoOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                    <div>
                      <div className="flex flex-row justify-between items-center">
                        <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
                          RadiologyAI Module: Nodule Detection & Classification
                        </h2>
                        <button
                          onClick={() => setModuleInfoOpen(false)}
                          className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <XIcon
                            className="h-6 w-6 text-gray-600"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div>
                        <div className="sm:hidden">
                          <label htmlFor="tabs" className="sr-only">
                            Select a tab
                          </label>
                          <select
                            id="tabs"
                            name="tabs"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            defaultValue={tabs.find(tab => tab.current).name}
                          >
                            {tabs.map(tab => (
                              <option key={tab.name}>{tab.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="hidden sm:block">
                          <div className="border-b border-gray-200">
                            <nav className="-mb-px flex" aria-label="Tabs">
                              {tabs.map(tab => (
                                <div
                                  key={tab.name}
                                  onClick={() => setCurrentTab(tab.name)}
                                  className={classNames(
                                    tab.name === currentTab
                                      ? "border-indigo-500 text-indigo-600"
                                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                    "w-1/4 cursor-pointer py-4 px-1 text-center border-b-2 font-medium text-sm"
                                  )}
                                  aria-current={
                                    tab.current ? "page" : undefined
                                  }
                                >
                                  {tab.name}
                                </div>
                              ))}
                            </nav>
                          </div>
                        </div>
                        <div>
                          {
                            {
                              Overview: <ModelOverview />,
                              "Clinical validation": <ModelValidation />,
                              Datasets: <ModelDatasets />,
                              Performance: <ModelPerformance />,
                            }[currentTab]
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </Layout>
    </UserStateContext.Provider>
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
      nodules: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        images: PropTypes.shape({
          thumbnail: PropTypes.string,
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
        }),
      }),
    }),
  }),
}
export default Scan
