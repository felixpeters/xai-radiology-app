import React from "react"
import Slider from "rc-slider"

export default function NoduleCharacteristics({ data }) {
  return (
    <>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
        Predicted characteristics
      </h3>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data.map(classification => (
            <li
              key={classification.classification.name}
              className="flex flex-row md:flex-col px-4 py-4 sm:px-6"
            >
              <div className="-mx-2 text-sm font-medium text-gray-900">
                {classification.classification.name}
              </div>
              <div className="w-5/6 mx-auto">
                <Slider
                  min={0}
                  max={classification.classification.marks.length - 1}
                  value={classification.value - 1}
                  step={null}
                  marks={{ ...classification.classification.marks }}
                  trackStyle={{ backgroundColor: "#6366F1" }}
                  handleStyle={{
                    borderColor: "#6366F1",
                  }}
                  activeDotStyle={{
                    borderColor: "#6366F1",
                  }}
                  className="my-4"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
