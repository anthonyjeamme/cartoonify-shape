import React, { useEffect, useRef } from "react"
import Point from "~utils/math/Point/Point"
import { TPoint } from "~utils/math/Point/Point.types"
import { pointsToPath } from "../Renderer/Renderer.utils"

import "./Export.scss"

const Export = ({ points }) => {
  const textareaRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    textareaRef.current.style.height = "0"
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
  }, [points])

  return (
    <div className="Export">
      <textarea ref={textareaRef} value={pointsToSVG(points)} />
    </div>
  )
}

export default Export

const pointsToSVG = (points: TPoint[]) => {
  const color = "#333333"

  return `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" height="400" width="800">
	<path
		fill="${color}"
		stroke="${color}"
		strokeWidth="1"
		d="${pointsToPath(points.map(({ x, y }) => Point.new(x, y + 50)))}"
	/>
</svg>`
}
