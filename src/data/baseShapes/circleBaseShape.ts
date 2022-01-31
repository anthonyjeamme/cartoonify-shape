import Point from "~utils/math/Point/Point"
import { TPoint } from "~utils/math/Point/Point.types"
import { TBaseShapeDefinition } from "~utils/shape/Shape.types"

export const circleBaseShape: TBaseShapeDefinition = {
  label: "Circle",
  name: "circle",
  params: {
    radius: {
      defaultValue: 40,
    },
    segments: {
      defaultValue: 5,
    },
  },
  generator: params => {
    const segmentAngle = (Math.PI * 2) / params.segments

    const points: TPoint[] = []

    const center = Point.new(50, 50)

    for (let a = 0; a < params.segments; a++) {
      const dx = Math.cos(a * segmentAngle) * params.radius
      const dy = Math.sin(a * segmentAngle) * params.radius

      points.push(Point.new(center.x + dx, center.y + dy))
    }

    return points
  },
}
