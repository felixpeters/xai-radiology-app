import React from "react"
import classnames from "classnames"
import { useStaticQuery, graphql } from "gatsby"

export default function WorkList() {
  const data = useStaticQuery(
    graphql`
      query {
        allScansJson {
          edges {
            node {
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
                name
                datetime
                reason
              }
            }
          }
        }
      }
    `
  )
  return (
    <>
      {console.log(data)}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Worklist
        </h1>
      </div>
      <div className="max-w-7xl mx-auto mb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col">
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
                        Priority
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Patient
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Procedure
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Procedure reason
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Open</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.allScansJson.edges.map(scan => (
                      <tr key={scan.node.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={classnames(
                              "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                              {
                                "bg-red-100 text-red-800":
                                  scan.node.priority.code == "High",
                                "bg-yellow-100 text-yellow-800":
                                  scan.node.priority.code == "Medium",
                                "bg-green-100 text-green-800":
                                  scan.node.priority.code == "Low",
                              }
                            )}
                          >
                            {scan.node.priority.code}:{" "}
                            {scan.node.priority.explanation}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {scan.node.patient.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {scan.node.patient.sex}, {scan.node.patient.age}{" "}
                                years
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {scan.node.procedure.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {scan.node.procedure.datetime}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm text-gray-900">
                            {scan.node.procedure.reason}
                          </div>
                          <div className="text-sm text-gray-500">
                            No prior scans available
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Open
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
