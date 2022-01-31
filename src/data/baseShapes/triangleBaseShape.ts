import Point from "~utils/math/Point/Point"
import { TBaseShapeDefinition } from "~utils/shape/Shape.types"

export const triangleBaseShape: TBaseShapeDefinition = {
  label: "Triangle",
  name: "triangle",
  params: {
    height: {
      defaultValue: 100,
    },
    width: {
      defaultValue: 100,
    },
  },
  generator: params => [
    Point.new(0, 0),
    Point.new(params.width, 0),
    Point.new(params.width / 2, params.height),
  ],
}
