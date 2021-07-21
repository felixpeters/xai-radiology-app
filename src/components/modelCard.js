import React from "react"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import classnames from "classnames"
import ModelOverview from "./modelOverview"
import ModelValidation from "./modelValidation"
import ModelDatasets from "./modelDataset"
import ModelPerformance from "./modelPerformance"
import { useMixpanel } from "gatsby-plugin-mixpanel"

export default function ModelCard({ show, toggle }) {
  const tabs = [
    { name: "Overview", href: "#", current: true },
    { name: "Clinical validation", href: "#", current: false },
    { name: "Datasets", href: "#", current: false },
    { name: "Performance", href: "#", current: false },
  ]
  const [currentTab, setCurrentTab] = useState("Overview")
  const mixpanel = useMixpanel()

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={show}
        onClose={() => {
          mixpanel.track("close model card")
          toggle(false)
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
                    Model Card: Nodule Detection & Classification
                  </h2>
                  <button
                    onClick={() => {
                      mixpanel.track("close model card")
                      toggle(false)
                    }}
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <XIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div>
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      defaultValue={tabs.find(tab => tab.current).name}
                      onChange={event => {
                        mixpanel.track(
                          "open model card tab " + event.target.value
                        )
                        setCurrentTab(event.target.value)
                      }}
                    >
                      {tabs.map(tab => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex" aria-label="Tabs">
                        {tabs.map(tab => (
                          <div
                            key={tab.name}
                            onClick={() => {
                              mixpanel.track("open model card tab " + tab.name)
                              setCurrentTab(tab.name)
                            }}
                            className={classnames(
                              tab.name === currentTab
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "w-1/4 cursor-pointer py-4 px-1 text-center border-b-2 font-medium text-sm"
                            )}
                            aria-current={tab.current ? "page" : undefined}
                          >
                            {tab.name}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div>
                    {
                      {
                        Overview: <ModelOverview />,
                        "Clinical validation": <ModelValidation />,
                        Datasets: <ModelDatasets />,
                        Performance: <ModelPerformance />,
                      }[currentTab]
                    }
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
