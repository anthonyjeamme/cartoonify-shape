import React, { useEffect, useState } from "react"

import { TRendererComponent, TViewport } from "./Renderer.types"

import {
  computeViewPort,
  pointsToPath,
  translatePointsToZero,
  viewPortToSVGViewbox,
} from "./Renderer.utils"
import Point from "~utils/math/Point/Point"

import "./Renderer.scss"

const Renderer: TRendererComponent = ({ points }) => {
  const [color, setColor] = useState("#333333")
  const [viewPoints, setViewPoints] = useState(false)
  const [zoom, setZoom] = useState(1)

  const [viewPort, setViewPort] = useState<TViewport>(computeViewPort(points))

  const centeredPoints = translatePointsToZero(points)

  useEffect(() => {
    setViewPort(computeViewPort(centeredPoints))
  }, [points])

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

        <span className="label">Zoom</span>
        <select
          value={zoom}
          onChange={e => {
            setZoom(parseInt(e.target.value, 10))
          }}
        >
          <option value={1}>x1</option>
          <option value={2}>x2</option>
          <option value={3}>x3</option>
        </select>
      </div>

      <div className="container">
        <svg
          viewBox={viewPortToSVGViewbox(viewPort)}
          height={viewPort.height * zoom}
          width={viewPort.width * zoom}
        >
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
