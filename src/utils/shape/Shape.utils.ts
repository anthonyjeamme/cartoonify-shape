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
  points.map(({ x, y }) => Point.new(Math.round(x), Math.round(y)))
