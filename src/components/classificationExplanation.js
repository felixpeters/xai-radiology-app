import React from "react"
import { InformationCircleIcon } from "@heroicons/react/solid"

export default function ClassificationExplanation() {
  return (
    <div className="rounded-md shadow bg-blue-50 mb-4 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 text-sm text-blue-700">
          <p>
            The nodule classification AI receives the{" "}
            <b>3D nodule volume as an input</b> and generates the{" "}
            <b>following outputs:</b>{" "}
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <b>Nodule measurements</b>, i.e., diameter, area and volume
            </li>
            <li>
              <b>Nodule characteristics</b>, e.g., sharpness of margin or
              spiculation
            </li>
            <li>
              <b>Malignancy score</b>, i.e., predicted probability that nodule
              is malignant
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
