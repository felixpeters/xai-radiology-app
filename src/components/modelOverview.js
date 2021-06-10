import React from "react"
import { PaperClipIcon } from "@heroicons/react/solid"

export default function ModelOverview() {
  return (
    <div className="mt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Module overview
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Module name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Lung nodule detection & classification
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Publication date
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              13.06.2020, Version 1.0.3-0085
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Developer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Radiology AI Inc., 1 Main Street, San Francisco, CA 94107, USA
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Intended use</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              The module provides AI-based support to help the user detect,
              classify and report lungnodules in CT scans. It is intended to be
              used by trained healthcare professionals to assist in the
              diagnosis of lung cancer.
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Limitations</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              The nodule detection and classification module is optimized for
              Low Dose-CT. However, the models will process any chest CT in
              DICOM format, including regular dose CT, CAP and PA series.
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Included models
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Model 1: Segmentation of lung nodules in chest CT scans</li>
                <li>
                  Model 2: Classification of lung nodules from their 3D image
                  volume into benign or malignant nodules
                </li>
              </ul>
            </dd>
          </div>
        </dl>
        <img
          className="block h-48 w-auto mx-auto"
          src={"/model_overview.png"}
        />
      </div>
    </div>
  )
}
