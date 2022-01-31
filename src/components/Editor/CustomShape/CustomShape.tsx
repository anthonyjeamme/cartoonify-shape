import React, { useRef, useState } from "react"
import Point from "~utils/math/Point/Point"
import { TPoint } from "~utils/math/Point/Point.types"
import { pointsToPath } from "../Renderer/Renderer.utils"

import { findProximityPoint } from "./CustomShape.utils"

import "./CustomShape.scss"

const CustomShape = ({ points, setPoints }) => {
  const rootRef = useRef<HTMLDivElement>()
  const [overPoint, setOverPoint] = useState<TPoint>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [draggingPoint, setDraggingPoint] = useState<TPoint>()

  const isDraggingIndexRef = useRef<number>(null)

  const handleAddPoint = ({ x, y }) => {
    setPoints([
      ...points.slice(0, currentIndex + 1),
      Point.new(x, y),
      ...points.slice(currentIndex + 1),
    ])
    setCurrentIndex(currentIndex + 1)
  }

  console.log(currentIndex)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
  }

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()

    const x = e.pageX - rootRef.current.offsetLeft
    const y = e.pageY - rootRef.current.offsetTop

    const pointToRemove = findProximityPoint(Point.new(x, y), points)

    if (pointToRemove) {
      const index = points.findIndex(point => Point.eq(point, pointToRemove))

      setPoints(points.filter(point => !Point.eq(point, pointToRemove)))

      if (currentIndex >= index) {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.pageX - rootRef.current.offsetLeft
    const y = e.pageY - rootRef.current.offsetTop

    const proximityPoint = findProximityPoint(Point.new(x, y), points)

    if (draggingPoint) {
      setPoints(
        points.map((point, index) =>
          index === isDraggingIndexRef.current ? Point.new(x, y) : point
        )
      )
    } else {
      setOverPoint(proximityPoint)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.pageX - rootRef.current.offsetLeft
    const y = e.pageY - rootRef.current.offsetTop
    const proximityPoint = findProximityPoint(Point.new(x, y), points)

    if (isDraggingIndexRef.current) {
      return
    }

    if (proximityPoint) {
      const index = points.findIndex(point => Point.eq(point, proximityPoint))

      isDraggingIndexRef.current = index
      setDraggingPoint(proximityPoint)
    }
  }
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (draggingPoint) {
      e.stopPropagation()
    } else {
      const x = e.pageX - rootRef.current.offsetLeft
      const y = e.pageY - rootRef.current.offsetTop

      if (isDraggingIndexRef.current) return null

      const proximityPoint = findProximityPoint(Point.new(x, y), points)

      if (proximityPoint) {
        const index = points.findIndex(point => Point.eq(point, proximityPoint))

        setCurrentIndex(index)
      } else {
        handleAddPoint({ x, y })
      }
    }
    //
    setDraggingPoint(null)
    isDraggingIndexRef.current = null
  }

  const handleDoubleClick = e => {
    const x = e.pageX - rootRef.current.offsetLeft
    const y = e.pageY - rootRef.current.offsetTop
    const proximityPoint = findProximityPoint(Point.new(x, y), points)

    if (proximityPoint) {
      const index = points.findIndex(point => Point.eq(point, proximityPoint))
      setCurrentIndex(index)
    }
  }

  return (
    <div className="CustomShape">
      <button
        onClick={() => {
          setPoints([])
          setCurrentIndex(-1)
        }}
      >
        Clean
      </button>

      <div
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        ref={rootRef}
      >
        <svg viewBox="0 0 1000 500" height={500} width={1000}>
          <path
            fill={"#333333"}
            stroke={"#333333"}
            // strokeWidth={1}
            d={pointsToPath(points)}
          />

          {points.map((point, index) => (
            <circle
              stroke="none"
              cx={point.x}
              cy={point.y}
              key={index}
              r={Point.eq(point, overPoint) ? 6 : 2}
              fill={currentIndex === index ? "blue" : "red"}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default CustomShape
