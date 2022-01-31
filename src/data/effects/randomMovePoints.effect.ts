import { TEffectDefinition } from "~utils/effect/effect.types"
import Point from "~utils/math/Point/Point"
import { seedRandom } from "~utils/seed/seed"

export const randomMovePoints: TEffectDefinition = {
  name: "randomMovePoints",
  label: "Move points randomly",
  apply: (points, inputs, seed) => {
    const variation = inputs.variation

    return points.map(({ x, y }) =>
      Point.new(
        x +
          Math.round(
            (seedRandom(`${seed}_${x}_${y}_${variation}`) - 0.5) * variation
          ),
        y +
          Math.round(
            (seedRandom(`${seed}_${x}_${y}_${variation}`) - 0.5) * variation
          )
      )
    )
  },
  inputs: [
    {
      label: "Variation",
      name: "variation",
      defaultValue: 5,
      type: "number",
      min: 1,
      max: 40,
      step: 1,
    },
  ],
}
