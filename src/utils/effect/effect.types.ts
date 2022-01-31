import { TPoint } from "~utils/math/Point/Point.types"

export type TEffect = {
  id: string
  inputs: {
    [name: string]: number
  }
  enabled: boolean
  definition: TEffectDefinition
}

export type TEffectDefinition = {
  name: string
  label: string

  inputs: TEffectDefinitionInput[]
  apply: (points: TPoint[], inputs: any, seed: string) => TPoint[]
}

export type TEffectDefinitionInput = {
  name: string
  label: string
  defaultValue: any
  type: "number" | "select"
  options?: { label: string; value: string }[]
  min?: number
  max?: number
  step?: number
}
