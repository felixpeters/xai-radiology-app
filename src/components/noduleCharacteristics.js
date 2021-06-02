import React from "react"
import Slider from "rc-slider"

export default function NoduleCharacteristics({ data }) {
  return (
    <>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
        Predicted characteristics
      </h3>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Characteristic
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Prediction
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map(classification => (
                  <tr key={classification.classification.name}>
                    <td className="w-1/4 px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {classification.classification.name}
                      </div>
                    </td>
                    <td className="w-3/4 px-6 py-4 whitespace-nowrap">
                      <Slider
                        min={0}
                        max={classification.classification.marks.length - 1}
                        value={classification.value - 1}
                        step={null}
                        marks={{ ...classification.classification.marks }}
                        trackStyle={{ backgroundColor: "#5a67d8" }}
                        handleStyle={{
                          borderColor: "#5a67d8",
                        }}
                        activeDotStyle={{
                          borderColor: "#5a67d8",
                        }}
                        className="mb-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
