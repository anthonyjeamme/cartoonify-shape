import { TEffectDefinition } from "~utils/effect/effect.types"
import { TPoint } from "~utils/math/Point/Point.types"
import { Vector } from "~utils/math/Vector/Vector"
import { seedRandom } from "~utils/seed/seed"

export const breakEffect: TEffectDefinition = {
  name: "break",
  label: "Break",
  inputs: [
    {
      defaultValue: 50,
      label: "Quantity",
      name: "quantity",
      type: "number",
    },
    {
      defaultValue: 10,
      label: "Deviation",
      name: "deviation",
      type: "number",
    },
    {
      defaultValue: 10,
      label: "Width",
      name: "width",
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
    const result: TPoint[] = []

    for (let i = 0; i < points.length; i++) {
      const A = points[i]
      const B = points[(i + 1) % points.length]

      const middlePoints = addLineBreak(A, B, seed + i, inputs)

      middlePoints.forEach(subPoint => result.push(subPoint))

      result.push(B)
    }

    return result
  },
}

const addLineBreak = (A: TPoint, B: TPoint, seed: string, inputs): TPoint[] => {
  const { quantity, deviation, minlength, direction, width } = inputs

  const ABVector = Vector.fromPoints(A, B)

  const length = Vector.length(ABVector)

  const prob = seedRandom(seed + "prob")

  const qq = Math.max(0, Math.min(quantity, 100)) / 100

  if (qq < prob) return []

  if (length < minlength) return []

  const breakPosition = Math.min(0.9, Math.max(0.1, seedRandom(seed + "p")))

  const startDeviation = (seedRandom(seed + "p1") - 0.5) / 4

  const breakDeviation =
    (seedRandom(seed + "p2") - (direction === "both" ? 0.5 : 0)) *
    (direction === "both" ? 2 : direction === "inside" ? -1 : 1)
  const endDeviation = (seedRandom(seed + "p3") - 0.5) / 4

  const normVector = Vector.normalize(ABVector)
  const deviationVector = Vector.rotate(normVector)

  const startPoint = Vector.translatePoint(
    A,
    Vector.addVectors(
      Vector.multiply(normVector, length * (breakPosition - 0.01 * width)),
      Vector.multiply(deviationVector, startDeviation * deviation)
    )
  )

  const middlePoint = Vector.translatePoint(
    A,
    Vector.addVectors(
      Vector.multiply(normVector, length * breakPosition),
      Vector.multiply(deviationVector, breakDeviation * deviation)
    )
  )

  const endPoint = Vector.translatePoint(
    A,
    Vector.addVectors(
      Vector.multiply(normVector, length * (breakPosition + 0.01 * width)),
      Vector.multiply(deviationVector, endDeviation * deviation)
    )
  )

  return [startPoint, middlePoint, endPoint]
}
