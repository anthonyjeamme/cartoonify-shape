import { TPoint } from "~utils/math/Point/Point.types"

export type TShape = {
  name: string
  params: TBaseShapeParams
  points: TPoint[]
}

export type TBaseShapeDefinition = {
  params: TBaseShapeParamsDefinition
  name: string
  label: string
  generator: (params: TBaseShapeParams) => TPoint[]
}

export type TBaseShapeParams = {
  [key: string]: number
}

export type TBaseShapeParamsDefinition = {
  [key: string]: TBaseShapeParamDefinition
}

export type TBaseShapeParamDefinition = {
  defaultValue: number
  min?: number
  max?: number
}

export type TFigure = {
  base: any
  noise: TFigureNoise
  effects: TFigureEffect[]
}

export type TFigureNoise = {
  // TODO
}

export type TFigureEffect = {
  // TODO
}
