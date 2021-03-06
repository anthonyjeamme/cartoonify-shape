import { TEffectDefinition } from "~utils/effect/effect.types"
import { TPoint } from "~utils/math/Point/Point.types"
import { Vector } from "~utils/math/Vector/Vector"
import { seedRandom } from "~utils/seed/seed"

export const subdiviseEffect: TEffectDefinition = {
  name: "subdivise",
  label: "Subdivise",
  inputs: [
    {
      defaultValue: 10,
      label: "Deviation",
      name: "deviation",
      type: "number",
    },
    {
      defaultValue: 10,
      label: "Min length of eligibility",
      name: "minlength",
      type: "number",
    },
    {
      label: "Direction",
      name: "direction",
      type: "select",
      defaultValue: "both",
      options: [
        {
          label: "Both",
          value: "both",
        },
        {
          label: "Inside",
          value: "inside",
        },
        {
          label: "Outside",
          value: "outside",
        },
      ],
    },
  ],
  apply: (points, inputs, seed) => {
    //

    const result: TPoint[] = []

    for (let i = 0; i < points.length; i++) {
      const A = points[i]
      const B = points[(i + 1) % points.length]

      const middlePoints = subdiviseLine(A, B, seed + i, inputs)

      middlePoints.forEach(subPoint => result.push(subPoint))

      result.push(B)
    }

    return result
  },
}

const subdiviseLine = (A: TPoint, B: TPoint, seed: string, inputs) => {
  const { deviation, minlength, direction } = inputs
  const points = []

  const pointPosition = seedRandom(seed + "p") / 2 + 0.25

  const pointDeviation =
    (seedRandom(seed + "p2") - (direction === "both" ? 0.5 : 0)) *
    (direction === "both" ? 2 : direction === "inside" ? -1 : 1)

  const ABVector = Vector.fromPoints(A, B)
  const length = Vector.length(ABVector)

  if (length < minlength) {
    return []
  }

  const normVector = Vector.normalize(ABVector)

  const deviationVector = Vector.rotate(normVector)

  const point = Vector.translatePoint(
    A,
    Vector.addVectors(
      Vector.multiply(normVector, length * pointPosition),
      Vector.multiply(deviationVector, pointDeviation * deviation)
    )
  )

  points.push(point)

  return points
}
