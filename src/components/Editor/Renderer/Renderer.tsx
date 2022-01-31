import React, { useState } from "react"

import { TRendererComponent } from "./Renderer.types"

import { pointsToPath } from "./Renderer.utils"
import Point from "~utils/math/Point/Point"

import "./Renderer.scss"

const Renderer: TRendererComponent = ({ points }) => {
  const [color, setColor] = useState("#333333")
  const [viewPoints, setViewPoints] = useState(false)

  const centeredPoints = points.map(({ x, y }) => Point.new(x, y + 50))

  return (
    <div className="Renderer">
      <div className="params">
        <span className="label">Color:</span>
        <input
          style={{ width: 100 }}
          value={color}
          onChange={e => {
            setColor(e.target.value)
          }}
        />
        <span className="label" style={{ marginLeft: 20 }}>
          See points
        </span>

        <input
          type="checkbox"
          checked={viewPoints}
          onClick={() => {
            setViewPoints(!viewPoints)
          }}
        />
      </div>

      <div className="container">
        <svg viewBox="0 0 100 200" height={200 * 2} width={400 * 2}>
          <path
            fill={color}
            stroke={color}
            // strokeWidth={1}
            d={pointsToPath(centeredPoints)}
          />

          {viewPoints &&
            centeredPoints.map(({ x, y }, index) => (
              <circle
                stroke="none"
                cx={x}
                cy={y}
                key={index}
                r="2"
                fill="red"
              />
            ))}
        </svg>
      </div>
    </div>
  )
}
export default Renderer
