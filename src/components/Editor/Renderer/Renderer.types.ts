import React from "react"
import { TPoint } from "~utils/math/Point/Point.types"

export type TRendererComponent = React.FC<TRendererProps>

type TRendererProps = {
  showPoints?: boolean
  points: TPoint[]
}

export type TViewport = {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}
