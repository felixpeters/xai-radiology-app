import React from "react"
import NoduleMeasurements from "./noduleMeasurements"
import NoduleCharacteristics from "./noduleCharacteristics"

export default function NoduleClassification({ data }) {
  const nodule = data
  return (
    <>
      <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
        Classification
      </h2>
      <NoduleMeasurements data={nodule.measurements} />
      <NoduleCharacteristics data={nodule.classifications.additional} />
    </>
  )
}
