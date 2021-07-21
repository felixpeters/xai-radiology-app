import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Slider from "rc-slider"
import { Link } from "gatsby"
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid"
import GlobalStateContext from "../components/globalStateContext"

function convertScoreValueToClass(value) {
  if (value >= 0.0 && value < 0.34) {
    return "Benign"
  } else if (value >= 0.34 && value < 0.67) {
    return "Indeterminate"
  } else {
    return "Malignant"
  }
}

function NoduleMalignancy({ data, state, scanId, handleClassification }) {
  const classification = data.classifications.main
  const nodule = data
  const createSliderWithTooltip = Slider.createSliderWithTooltip
  const MalignancySlider = createSliderWithTooltip(Slider)
  const getColor = value => {
    if (value >= 0.0 && value < 0.34) return "#10b981"
    if (value >= 0.34 && value < 0.67) return "#f59e0b"
    if (value >= 0.67) return "#ef4444"
  }
  return (
    <GlobalStateContext.Consumer>
      {state => (
        <>
          <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">
            Malignancy classification
          </h3>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li
                key="ai"
                className={classnames("flex px-4 py-4 sm:px-6", {
                  "flex-row items-center": state.showExplanations !== "on",
                  "flex-row md:flex-col": state.showExplanations === "on",
                })}
              >
                <div className="-ml-2 text-sm font-medium text-gray-900">
                  AI Malignancy Score
                </div>
                {state.showExplanations === "on" && (
                  <div className="w-5/6 mx-auto">
                    <MalignancySlider
                      min={0}
                      max={100}
                      value={classification.ai * 100}
                      step={1}
                      marks={{
                        0: "Benign",
                        100: "Malignant",
                      }}
                      trackStyle={{
                        backgroundColor: getColor(classification.ai),
                      }}
                      handleStyle={{
                        borderColor: getColor(classification.ai),
                      }}
                      activeDotStyle={{
                        borderColor: getColor(classification.ai),
                      }}
                      className="my-4"
                      tipFormatter={value => `${value}%`}
                    />
                  </div>
                )}
                {state.showExplanations !== "on" && (
                  <div className="ml-4 md:ml-40 lg:ml-28 text-sm">
                    {convertScoreValueToClass(classification.ai)}
                  </div>
                )}
              </li>
              <li
                key="human"
                className="flex  items-center flex-row px-4 py-4 sm:px-6"
              >
                <label
                  htmlFor="classification"
                  className="-mx-2 flex-1 text-sm font-medium text-gray-900"
                >
                  Physician classification
                </label>
                <select
                  id="classification"
                  name="classification"
                  className="mt-1 block flex-1 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  defaultValue={state["nodule" + nodule.id + "_classification"]}
                  onChange={event => {
                    handleClassification({
                      name: "nodule" + nodule.id + "_classification",
                      value: event.target.value,
                    })
                  }}
                >
                  <option>Open</option>
                  <option>Benign</option>
                  <option>Indeterminate</option>
                  <option>Malignant</option>
                </select>
              </li>
            </ul>
          </div>
          <div className="flex flex-row justify-end mt-4">
            <Link
              state={state}
              to={"/scans/" + scanId}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowNarrowLeftIcon className="h-5 w-5 text-white mr-2" />
              Back to scan
            </Link>
          </div>
        </>
      )}
    </GlobalStateContext.Consumer>
  )
}

NoduleMalignancy.propTypes = {
  data: PropTypes.shape({
    ai: PropTypes.number,
    physician: PropTypes.string,
  }),
}

export default NoduleMalignancy
