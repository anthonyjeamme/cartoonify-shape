import { TPoint } from "./Point.types"

const Point = {
  new: (x: number, y: number): TPoint => ({
    x,
    y,
  }),
}

export default Point
