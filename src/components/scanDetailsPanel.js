import React from "react"
import { Fragment } from "react"
import classnames from "classnames"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon, ArrowCircleRightIcon } from "@heroicons/react/outline"
import { useMixpanel } from "gatsby-plugin-mixpanel"

export default function ScanDetailsPanel({ scan, show, toggle }) {
  const mixpanel = useMixpanel()
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={show}
        onClose={() => {
          mixpanel.track("close scan details")
          toggle(false)
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Scan details
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            mixpanel.track("close scan details")
                            toggle(false)
                          }}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                            <dt className="text-sm font-medium text-gray-500">
                              Priority
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                              <span
                                className={classnames(
                                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                  {
                                    "bg-red-100 text-red-800":
                                      scan.priority.code == "High",
                                    "bg-yellow-100 text-yellow-800":
                                      scan.priority.code == "Medium",
                                    "bg-green-100 text-green-800":
                                      scan.priority.code == "Low",
                                  }
                                )}
                              >
                                {scan.priority.code}:{" "}
                                {scan.priority.explanation}
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                            <dt className="text-sm font-medium text-gray-500">
                              Patient
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                              <div className="flex flex-col">
                                <div className="text-sm text-gray-900">
                                  {scan.patient.name}
                                </div>
                                <div className="text-sm text-gray-900">
                                  {scan.patient.sex}
                                </div>
                                <div className="text-sm text-gray-900">
                                  {scan.patient.age} years
                                </div>
                              </div>
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 ">
                            <dt className="text-sm font-medium text-gray-500">
                              Procedure
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                              <div className="flex flex-col">
                                <div className="text-sm text-gray-900">
                                  {scan.procedure.name}
                                </div>
                                <div className="text-sm text-gray-900">
                                  {scan.procedure.datetime}
                                </div>
                                <div className="text-sm text-gray-900">
                                  {scan.procedure.reason}
                                </div>
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
