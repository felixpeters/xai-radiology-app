import React from "react"
import { Link } from "gatsby"

export default function NoduleList(data) {
  const nodules = data.data
  return (
    <>
      {console.log(nodules)}
      <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
        Detected nodules
      </h2>
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
                        className="h-16 w-16"
                        src={"/" + nodule.image}
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Diameter: {nodule.measurements.diameter} mm
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Area: {nodule.measurements.area} mm²
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Volume: {nodule.measurements.volume} mm³
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        AI: {nodule.classifications.ai * 100} %
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Physician: {nodule.classifications.physician}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to="#"
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
  )
}
