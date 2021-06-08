import React from "react"
import Slider from "rc-slider"

export default function NoduleMalignancy({ data }) {
  const classification = data
  const createSliderWithTooltip = Slider.createSliderWithTooltip
  const MalignancySlider = createSliderWithTooltip(Slider)
  const getColor = value => {
    if (value >= 0.0 && value < 0.34) return "#10b981"
    if (value >= 0.34 && value < 0.67) return "#f59e0b"
    if (value >= 0.67) return "#ef4444"
  }
  return (
    <>
      <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">
        Malignancy classification
      </h3>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          <li key="ai" className="flex flex-row md:flex-col px-4 py-4 sm:px-6">
            <div className="-mx-2 text-sm font-medium text-gray-900">
              AI Malignancy Score
            </div>
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
          </li>
          <li
            key="human"
            className="flex flex-col items-center sm:flex-row px-4 py-4 sm:px-6"
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
              className="mt-1 block flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={classification.physician}
            >
              <option>Open</option>
              <option>Benign</option>
              <option>Indeterminate</option>
              <option>Malignant</option>
            </select>
          </li>
        </ul>
      </div>
    </>
  )
}
