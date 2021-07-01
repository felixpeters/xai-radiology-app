import React from "react"
import NoduleMeasurements from "./noduleMeasurements"
import NoduleCharacteristics from "./noduleCharacteristics"
import NoduleMalignancy from "./noduleMalignancy"
import ClassificationExplanation from "./classificationExplanation"

export default function NoduleClassification({
  data,
  state,
  handleClassification,
}) {
  const nodule = data
  return (
    <>
      <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
        Classification
      </h2>
      <ClassificationExplanation />
      <NoduleMeasurements data={nodule.measurements} />
      <NoduleCharacteristics data={nodule.classifications.additional} />
      <NoduleMalignancy
        data={nodule}
        state={state}
        handleClassification={handleClassification}
      />
    </>
  )
}
