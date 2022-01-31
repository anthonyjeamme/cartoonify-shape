import Point from "~utils/math/Point/Point"
import { TPoint } from "~utils/math/Point/Point.types"
import { Shape } from "~utils/svg/shape"
import { TViewport } from "./Renderer.types"

export const pointsToPath = (points: TPoint[]) => {
  if (points.length === 0) return ""

  const shape = new Shape(points[0])
  points.slice(1).forEach(point => shape.lineTo(point))
  shape.lineTo(points[0])
  shape.close()

  return shape.toString()
}

export const translatePointsToZero = (points: TPoint[]): TPoint[] => {
  const dx = Math.min(...points.map(({ x }) => x)) - 10
  const dy = Math.min(...points.map(({ y }) => y)) - 10

  return points.map(({ x, y }) => Point.new(x - dx, y - dy))
}

export const computeViewPort = (points: TPoint[]): TViewport => {
  const padding = 20
  const top = 0
  const bottom =
    Math.max(...points.map(({ y }) => y)) -
    Math.min(...points.map(({ y }) => y)) +
    padding
  const left = 0
  const right =
    Math.max(...points.map(({ x }) => x)) -
    Math.min(...points.map(({ x }) => x)) +
    padding

  const width = right - left
  const height = bottom - top

  return {
    top,
    bottom,
    left,
    right,
    width,
    height,
  }
}

export const viewPortToSVGViewbox = (viewPort: TViewport) => {
  return `${viewPort.left} ${viewPort.top} ${viewPort.width} ${viewPort.height}`
}
