import React from "react"
import { InformationCircleIcon } from "@heroicons/react/solid"

export default function SimilarNodulesExplanation() {
  return (
    <div className="rounded-md shadow bg-blue-50 my-4 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 text-sm text-blue-700">
          <p>
            Similar nodules are collected from all <b>cases in your CAS</b>. The{" "}
            <b>k-nearest neighbors algorithm</b> is used to determine the most
            similar nodules, as measured by the{" "}
            <b>Euclidian distance based on the following features</b>:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <b>Nodule measurements</b>, i.e., diameter, area and volume
            </li>
            <li>
              <b>Nodule characteristics</b>, e.g., sharpness of margin or
              spiculation
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
