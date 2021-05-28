import React from "react"
import { useState } from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import Slider from "rc-slider"
import { Switch } from "@headlessui/react"

function NoduleImage({ images }) {
  const [currentSlice, setCurrentSlice] = useState(
    Math.round(images.num_slices / 2)
  )
  const [showHeatmap, setShowHeatmap] = useState(true)
  const zeroPad = (num, places) => String(num).padStart(places, "0")
  return (
    <>
      <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
        Image section
      </h2>
      <img
        className={classnames("h-auto w-full", {
          hidden: showHeatmap == true,
          block: showHeatmap == false,
        })}
        src={`/${images.slices}/slice_${zeroPad(currentSlice - 1, 2)}.png`}
      />
      <img
        className={classnames("h-auto w-full", {
          hidden: showHeatmap == false,
          block: showHeatmap == true,
        })}
        src={`/${images.slices}/slice_${zeroPad(currentSlice - 1, 2)}.png`}
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex-1">
          <div className="flex items-center justify-start">
            <Slider
              min={1}
              max={images.num_slices}
              value={currentSlice}
              step={1}
              railStyle={{ backgroundColor: "#5a67d8" }}
              trackStyle={{ backgroundColor: "#5a67d8" }}
              handleStyle={{
                borderColor: "#5a67d8",
              }}
              dotStyle={{
                borderColor: "#5a67d8",
              }}
              onChange={setCurrentSlice}
              className="w-4"
            />
            <span className="min-w-max ml-3 text-sm font-medium text-gray-900">
              Image {zeroPad(currentSlice, 2)}/{images.num_slices}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <Switch.Group as="div" className="flex items-center justify-end">
            <Switch
              checked={showHeatmap}
              onChange={setShowHeatmap}
              className={classnames(
                showHeatmap ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classnames(
                  showHeatmap ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm font-medium text-gray-900">
                Show heatmap
              </span>
            </Switch.Label>
          </Switch.Group>
        </div>
      </div>
    </>
  )
}

NoduleImage.propTypes = {
  images: PropTypes.shape({
    thumbnail: PropTypes.string,
    num_slices: PropTypes.number,
    slices: PropTypes.string,
  }),
}

export default NoduleImage
