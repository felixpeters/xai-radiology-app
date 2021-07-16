import React from "react"
import NoduleMeasurements from "./noduleMeasurements"
import NoduleCharacteristics from "./noduleCharacteristics"
import NoduleMalignancy from "./noduleMalignancy"
import ClassificationExplanation from "./classificationExplanation"
import GlobalStateContext from "../components/globalStateContext"

export default function NoduleClassification({
  data,
  state,
  scanId,
  handleClassification,
}) {
  const nodule = data
  return (
    <GlobalStateContext.Consumer>
      {state => (
        <>
          <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
            Classification
          </h2>
          {state.showExplanations && <ClassificationExplanation />}
          <NoduleMeasurements data={nodule.measurements} />
          <NoduleCharacteristics data={nodule.classifications.additional} />
          <NoduleMalignancy
            data={nodule}
            state={state}
            scanId={scanId}
            handleClassification={handleClassification}
          />
        </>
      )}
    </GlobalStateContext.Consumer>
  )
}
