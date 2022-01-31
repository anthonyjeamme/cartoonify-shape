import Point from "~utils/math/Point/Point"
import { TBaseShapeDefinition } from "~utils/shape/Shape.types"

export const squareBaseShape: TBaseShapeDefinition = {
  label: "Square",
  name: "square",
  params: {
    height: {
      defaultValue: 100,
    },
    width: {
      defaultValue: 100,
    },
  },
  generator: params => {
    return [
      Point.new(0, 0),
      Point.new(params.width, 0),
      Point.new(params.width, params.height),
      Point.new(0, params.height),
    ]
  },
}
