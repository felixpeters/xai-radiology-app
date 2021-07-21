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
            <b>segments lung nodules</b> larger than 3mm. All detected nodules
            are then <b>classified using the AI Malignancy Score</b>. The score
            states the AI's confidence that a given nodule is malignant. More
            information can be found in the <b>model card for this module</b>.
          </p>
        </div>
      </div>
    </div>
  )
}
