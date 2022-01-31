import { TEffectDefinition } from "~utils/effect/effect.types"
import { bevelEffect } from "./bevel.effect"
import { breakEffect } from "./break.effect"
import { randomMovePoints } from "./randomMovePoints.effect"
import { subdiviseEffect } from "./subdivise.effect"

export const effectsDefinitions: TEffectDefinition[] = [
  randomMovePoints,
  bevelEffect,
  subdiviseEffect,
  breakEffect,
]
