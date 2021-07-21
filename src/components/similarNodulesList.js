import React from "react"

export default function SimilarNodulesList({ nodules }) {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Slice
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Measurements & Diagnosis
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nodules.map(nodule => (
                <tr key={nodule.id}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <img
                      className="h-40 w-40"
                      src={"/" + nodule.thumbnail}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="mb-2 text-sm font-medium text-gray-900">
                      Calculated distance: {nodule.dist.toFixed(2)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Diameter: {nodule.diameter.toFixed(1)} mm
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Area: {nodule.area.toFixed(1)} mm²
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Volume: {nodule.volume.toFixed(1)} mm³
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-900">
                      AI Malignancy Score: {nodule.malignancy * 100}%
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Diagnosis: {nodule.diagnosis}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Diagnosis method: {nodule.diagnosisMethod}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
