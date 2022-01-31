import { TPoint } from "./Point.types"

const Point = {
  new: (x: number, y: number): TPoint => ({
    x,
    y,
  }),
  eq: (P1: TPoint, P2: TPoint) => P1?.x === P2?.x && P1?.y === P2?.y,
}

export default Point
