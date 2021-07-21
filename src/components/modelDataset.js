import React from "react"

export default function ModelDatasets() {
  return (
    <div className="mt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Datasets
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Data format</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Low-dose chest CTs in DICOM format
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Recording period
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              01.01.2016-31.12.2016
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Recording devices
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>GE Lightspeed</li>
                <li>Siemens Sensation</li>
                <li>Toshiba Aquilion</li>
                <li>Philips Brilliance</li>
                <li>Siemens Emotion</li>
                <li>Siemens Definition</li>
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Patient cohort
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              10,100 patients (male: 4950, female: 5150, age: 55 +/- 10.50)
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Nodule distributions
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <b>total:</b> 26,512 nodules from 10,100 scans (benign:
                  20,711, malignant: 5,901, avg. diameter: 10.2 +/- 6.7 mm)
                </li>
                <li>
                  <b>training dataset:</b> 21,612 nodules from 8,200 scans
                  (benign: 16,801, malignant: 4,811, avg. diameter: 10.1 +/- 6.8
                  mm)
                </li>
                <li>
                  <b>test dataset:</b> 5,000 nodules from 1,900 scans (benign:
                  3,910, malignant: 1,090, avg. diameter: 10.3 +/- 6.6 mm)
                </li>
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Labeling procedure
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Labels determined by 3/4 radiologist consensus (see Clinical
              Validation paper for more information)
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Data preprocessing
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Rescaling to consistent voxel size</li>
                <li>Intensity rescaling to 0-1 range</li>
                <li>Center spatial cropping to uniform volume size</li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
