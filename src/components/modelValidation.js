import React from "react"
import {
  DatabaseIcon,
  ChartBarIcon,
  ClipboardIcon,
} from "@heroicons/react/solid"

const publications = [
  {
    id: 1,
    type: "data",
    date: "September 2017",
    description: "Dataset collection, preprocessing & labeling",
    url: "https://www.medicaljournal.com/paper200000",
  },
  {
    id: 2,
    type: "measurement",
    date: "February 2018",
    description: "Development of AI Malignancy score",
    url: "https://www.medicaljournal.com/paper200010",
  },
  {
    id: 3,
    type: "study",
    date: "June 2018",
    description: "Model development & retrospective study",
    url: "https://www.medicaljournal.com/paper200020",
  },
  {
    id: 4,
    type: "study",
    date: "March 2019",
    description: "Randomized clinical trial",
    url: "https://www.medicaljournal.com/paper200030",
  },
]

export default function ModelValidation() {
  return (
    <div className="mt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Clinical validation
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Approvals</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Location: USA</li>
                <li>Institution: Food and Drug Administration (FDA)</li>
                <li>Approval number: K20000000</li>
                <li>Approval type: 510(k) premarket notification</li>
              </ul>
              <ul className="list-disc pl-5 space-y-1 mt-4">
                <li>Location: Europe</li>
                <li>Institution: European Medicines Agency (EMA)</li>
                <li>Approval type: CE Mark certificate</li>
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Related publications
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flow-root">
                <ul className="-mb-8">
                  {publications.map((pub, idx) => (
                    <li key={pub.id}>
                      <div className="relative pb-8">
                        {idx !== publications.length - 1 ? (
                          <span
                            className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          {pub.type === "data" ? (
                            <>
                              <div>
                                <div className="relative px-1">
                                  <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                    <DatabaseIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : pub.type === "measurement" ? (
                            <>
                              <div>
                                <div className="relative px-1">
                                  <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                    <ChartBarIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : pub.type === "study" ? (
                            <>
                              <div>
                                <div className="relative px-1">
                                  <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                                    <ClipboardIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {pub.date + ": " + pub.description}
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {pub.url}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
