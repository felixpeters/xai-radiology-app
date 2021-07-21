import React from "react"

export default function ModelPerformance() {
  return (
    <div className="mt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Model performance
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Basis</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Test dataset (N=5,000 nodules), ground truth labels determined by
              3/4 radiologist consensus
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Model type & output
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Convolutional neural network, outputs probability of nodule being
              malignant
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Performance metrics
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Sensitivity (True positive rate): 91.47%</li>
                <li>Specificity (True negative rate): 94.55%</li>
                <li>Accuracy (Fraction of correct predictions): 93.88%</li>
                <li>AUC (Area under the ROC curve): 0.9457</li>
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">ROC curve</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <img
                className="block h-auto sm:h-40 md:h-80 w-auto"
                src={"/roc_curve.jpg"}
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
