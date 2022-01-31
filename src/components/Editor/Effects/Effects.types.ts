import { TEffect } from "~utils/effect/effect.types"

export type TEffectComponentProps = {
  effect: TEffect
  handleChange: (effect: TEffect) => void
  handleRemove: () => void
  handleMoveUp: () => void
  handleMoveDown: () => void
}

export type TEffectInputsComponentProps = {
  effect: TEffect
  handleChange: (effect: TEffect) => void
}
