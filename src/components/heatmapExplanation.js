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
            The <span className="font-bold">heatmap</span> visualizes which{" "}
            <b>regions of the nodule the nodule classification AI focused on</b>{" "}
            when predicting the malignancy score.{" "}
            <b>The brighter a particular region</b> is displayed in the heatmap,
            the more strongly this region <b>increased the malignancy score</b>.
          </p>
        </div>
      </div>
    </div>
  )
}
