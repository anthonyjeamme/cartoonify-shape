import { TBaseShapeDefinition } from "~utils/shape/Shape.types"
import { circleBaseShape } from "./circleBaseShape"
import { squareBaseShape } from "./squareBaseShape"
import { triangleBaseShape } from "./triangleBaseShape"

export const baseShapes: TBaseShapeDefinition[] = [
  squareBaseShape,
  triangleBaseShape,
  circleBaseShape,
]
