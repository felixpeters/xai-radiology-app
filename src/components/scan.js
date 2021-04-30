import React from "react"
import { useState } from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import Slider from "rc-slider"

function ScanImage({ images }) {
  const [showOverlay, setShowOverlay] = useState(true)
  return (
    <>
      <h2 className="text-2xl py-4 font-bold leading-tight text-gray-900">
        Chest CT
      </h2>
      <img
        className={classnames("h-auto-w-auto", {
          hidden: showOverlay == true,
          block: showOverlay == false,
        })}
        src={"/" + images.raw}
      />
      <img
        className={classnames("h-auto-w-auto", {
          hidden: showOverlay == false,
          block: showOverlay == true,
        })}
        src={"/" + images.overlay}
      />
      <div className="flex flex-row">
        <Slider
          min={1}
          max={137}
          defaultValue={119}
          marks={{ 1: 1, 137: 137 }}
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
