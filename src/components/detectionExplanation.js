import React from "react"
import { InformationCircleIcon } from "@heroicons/react/solid"

export default function DetectionExplanation() {
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
            The <b>nodule detection AI</b> receives the{" "}
            <b>3D chest CT volume as an input</b> and{" "}
            <b>segments lung nodules</b> larger than 3mm. The following table
            lists all detected nodules, ordered by their estimated volume. All
            detected nodules are also marked in the overlay of the chest CT.
          </p>
        </div>
      </div>
    </div>
  )
}
