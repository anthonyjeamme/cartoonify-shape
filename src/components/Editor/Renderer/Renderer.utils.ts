import { TPoint } from "~utils/math/Point/Point.types"
import { Shape } from "~utils/svg/shape"

export const pointsToPath = (points: TPoint[]) => {
  const shape = new Shape(points[0])

  points.slice(1).forEach(point => shape.lineTo(point))

  shape.lineTo(points[0])

  shape.close()

  return shape.toString()
}
