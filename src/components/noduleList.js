import React from "react"
import classnames from "classnames"
import { Link } from "gatsby"
import DetectionExplanation from "./detectionExplanation"
import GlobalStateContext from "./globalStateContext"

function convertScoreValueToClass(value) {
  if (value >= 0.0 && value < 0.34) {
    return "Benign"
  } else if (value >= 0.34 && value < 0.67) {
    return "Indeterminate"
  } else {
    return "Malignant"
  }
}

export default function NoduleList({ data, setCurrentSlice }) {
  const nodules = data.sort((a, b) => {
    return b.measurements[2].stat - a.measurements[2].stat
  })
  return (
    <GlobalStateContext.Consumer>
      {state => (
        <>
          <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
            Detected nodules
          </h2>

          {state.showExplanations === "on" && <DetectionExplanation />}
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Thumbnail</span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Measurements
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Classification
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Open</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {nodules.map(nodule => (
                      <tr key={nodule.id}>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <img
                            className="h-auto w-auto"
                            src={"/" + nodule.images.thumbnail}
                            alt=""
                          />
                          <button
                            className="pt-1 text-xs font-normal text-gray-900 hover:text-indigo-900 focus:outline-none"
                            onClick={event => {
                              setCurrentSlice(nodule.main_slice)
                            }}
                          >
                            Slice {nodule.main_slice}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {nodule.measurements.map((measurement, index) => (
                            <div
                              key={`${index}-${measurement.name}`}
                              className="text-sm font-medium text-gray-900"
                            >
                              {measurement.name}: {measurement.stat}{" "}
                              {measurement.unit}
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <span
                              className={classnames(
                                "px-2 inline-flex text-sm leading-5 font-medium rounded-full",
                                {
                                  "bg-green-100 text-green-800":
                                    nodule.classifications.main.ai >= 0.0 &&
                                    nodule.classifications.main.ai < 0.34,
                                  "bg-yellow-100 text-yellow-800":
                                    nodule.classifications.main.ai >= 0.34 &&
                                    nodule.classifications.main.ai < 0.67,
                                  "bg-red-100 text-red-800":
                                    nodule.classifications.main.ai >= 0.67,
                                }
                              )}
                            >
                              AI Malignancy Score:{" "}
                              {state.showExplanations == "on"
                                ? String(nodule.classifications.main.ai * 100) +
                                  "%"
                                : convertScoreValueToClass(
                                    nodule.classifications.main.ai
                                  )}
                            </span>
                          </div>
                          <div className="mt-4 text-sm font-medium text-gray-900">
                            <span
                              className={classnames(
                                "px-2 inline-flex text-sm leading-5 font-medium rounded-full",
                                {
                                  "bg-green-100 text-green-800":
                                    state[
                                      "nodule" + nodule.id + "_classification"
                                    ] === "Benign",
                                  "bg-yellow-100 text-yellow-800":
                                    state[
                                      "nodule" + nodule.id + "_classification"
                                    ] === "Indeterminate",
                                  "bg-blue-100 text-blue-800":
                                    state[
                                      "nodule" + nodule.id + "_classification"
                                    ] === "Open",
                                  "bg-red-100 text-red-800":
                                    state[
                                      "nodule" + nodule.id + "_classification"
                                    ] === "Malignant",
                                }
                              )}
                            >
                              Physician classification:{" "}
                              {state["nodule" + nodule.id + "_classification"]}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={"./nodules/" + nodule.id}
                            state={state}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </GlobalStateContext.Consumer>
  )
}
