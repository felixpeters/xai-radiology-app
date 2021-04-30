import React from "react"
import { useState } from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import Slider from "rc-slider"
import { Switch } from "@headlessui/react"

function ScanImage({ images }) {
  const [showOverlay, setShowOverlay] = useState(true)
  return (
    <>
      <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
        Chest CT
      </h2>
      <img
        className={classnames("h-auto w-full", {
          hidden: showOverlay == true,
          block: showOverlay == false,
        })}
        src={"/" + images.raw}
      />
      <img
        className={classnames("h-auto w-full", {
          hidden: showOverlay == false,
          block: showOverlay == true,
        })}
        src={"/" + images.overlay}
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex-1">
          <div className="flex items-center justify-start">
            <Slider
              min={1}
              max={137}
              value={119}
              step={1}
              railStyle={{ backgroundColor: "#5a67d8" }}
              trackStyle={{ backgroundColor: "#5a67d8" }}
              handleStyle={{
                borderColor: "#5a67d8",
              }}
              dotStyle={{
                borderColor: "#5a67d8",
              }}
            />
            <span className="min-w-max ml-3 text-sm font-medium text-gray-900">
              Image 119/137
            </span>
          </div>
        </div>
        <div className="flex-1">
          <Switch.Group as="div" className="flex items-center justify-end">
            <Switch
              checked={showOverlay}
              onChange={setShowOverlay}
              className={classnames(
                showOverlay ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classnames(
                  showOverlay ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm font-medium text-gray-900">
                Show overlay
              </span>
            </Switch.Label>
          </Switch.Group>
        </div>
      </div>
    </>
  )
}

ScanImage.propTypes = {
  images: PropTypes.shape({
    raw: PropTypes.string,
    overlay: PropTypes.string,
  }),
}

export default ScanImage
