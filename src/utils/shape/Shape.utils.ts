import Point from "~utils/math/Point/Point"
import { TPoint } from "~utils/math/Point/Point.types"
import { TBaseShapeParams, TBaseShapeParamsDefinition } from "./Shape.types"

export const baseShapeParamDefinitionToParam = (
  paramsDefinition: TBaseShapeParamsDefinition
): TBaseShapeParams => {
  return Object.entries(paramsDefinition)
    .map(([key, value]) => [key, value.defaultValue])
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
}

export const roundPoints = (points: TPoint[]) =>
  cleanDuplicatePoints(
    points.map(({ x, y }) => Point.new(Math.round(x), Math.round(y)))
  )

export const cleanDuplicatePoints = (points: TPoint[]) => {
  const result: TPoint[] = []

  let previousPoint = points[points.length - 1]

  for (const point of points) {
    if (!Point.eq(previousPoint, point)) {
      result.push(point)
      previousPoint = point
    }
  }
  return result
}
