import { TEffectDefinition } from "~utils/effect/effect.types"
import { TPoint } from "~utils/math/Point/Point.types"
import { Vector } from "~utils/math/Vector/Vector"

export const bevelEffect: TEffectDefinition = {
  name: "bevel",
  label: "Bevel",
  inputs: [
    {
      name: "size",
      defaultValue: 5,
      label: "Size",
      type: "number",
      min: 0,
      max: 50,
      step: 1,
    },
  ],
  apply: (points, inputs) => {
    const result: TPoint[] = []

    for (let i = 0; i < points.length; i++) {
      const A = points[i]
      const B = points[(i + 1) % points.length]

      const ABVector = Vector.fromPoints(A, B)

      let vector = Vector.multiply(Vector.normalize(ABVector), inputs.size)

      const VLength = Vector.length(vector)
      const ABLength = Vector.length(Vector.fromPoints(A, B))

      if (VLength > ABLength / 2) {
        vector = Vector.multiply(Vector.normalize(ABVector), ABLength / 2)
      }

      result.push(Vector.translatePoint(A, vector))

      result.push(Vector.translatePoint(B, Vector.multiply(vector, -1)))
    }

    return result
  },
}
