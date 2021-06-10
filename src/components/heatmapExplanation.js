import React from "react"
import { InformationCircleIcon } from "@heroicons/react/solid"

export default function HeatmapExplanation() {
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
            The <span className="font-bold">heatmap</span> visualizes which
            parts of the nodule volume the nodule classification AI focused on
            when predicting the malignancy score:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <b>Red areas</b> represent parts of the image that{" "}
              <b>strongly increased the malignancy score</b>
            </li>
            <li>
              <b>Yellow areas</b> represent parts of the image that{" "}
              <b>slightly increased the malignancy score</b>
            </li>
            <li>
              <b>Blue areas</b> represent parts of the image that only had a{" "}
              <b>negligent effect on the malignancy score</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
