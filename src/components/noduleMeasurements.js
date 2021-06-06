import React from "react"
import PropTypes from "prop-types"

function NoduleMeasurements({ data }) {
  const measurements = data
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Calculated measurements
      </h3>
      <dl className="mt-4 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {measurements.map(item => (
          <div key={item.name} className="px-4 py-4">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-lg font-semibold text-indigo-600">
                {item.stat} {item.unit}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

NoduleMeasurements.propTypes = {
  data: PropTypes.arrayOf({
    name: PropTypes.string,
    stat: PropTypes.number,
    unit: PropTypes.string,
  }),
}

export default NoduleMeasurements
