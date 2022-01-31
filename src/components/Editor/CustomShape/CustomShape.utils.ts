import { TPoint } from "~utils/math/Point/Point.types"
import { Vector } from "~utils/math/Vector/Vector"

export const findProximityPoint = (
  target: TPoint,
  points: TPoint[],
  distance = 10
): TPoint | null => {
  if (points.length === 0) return null

  const [nearestPoint] = points
    .map(point => ({
      point,
      distance: Vector.length(Vector.fromPoints(point, target)),
    }))
    .sort((A, B) => A.distance - B.distance)

  if (nearestPoint.distance < distance) {
    return nearestPoint.point
  }

  return null
}
