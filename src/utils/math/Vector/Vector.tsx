import Point from "../Point/Point"
import { TPoint } from "../Point/Point.types"
import { TVector } from "./Vector.types"

export const Vector = {
  new: (x: number, y: number): TVector => ({ x, y }),
  addVectors: (V1: TVector, V2: TVector) =>
    Vector.new(V1.x + V2.x, V1.y + V2.y),
  normalize: (V: TVector): TVector => {
    const m = Math.sqrt(Math.pow(V.x, 2) + Math.pow(V.y, 2))

    return Vector.new(V.x / m, V.y / m)
  },
  length: (V: TVector) => Math.sqrt(Math.pow(V.x, 2) + Math.pow(V.y, 2)),
  add: (V: TVector, n: number): TVector => Vector.new(V.x * n, V.y * n),
  multiply: (V: TVector, factor: number): TVector =>
    Vector.new(V.x * factor, V.y * factor),
  fromPoints: (P1: TPoint, P2: TPoint) => Vector.new(P2.x - P1.x, P2.y - P1.y),
  translatePoint: (point: TPoint, vector: TVector) =>
    Point.new(point.x + vector.x, point.y + vector.y),
  rotate: (V: TVector) => Vector.new(V.y, -V.x),
}
