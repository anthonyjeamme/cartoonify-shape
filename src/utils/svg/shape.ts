import { TPoint } from "~utils/math/Point/Point.types"

export class Shape {
  particules = []

  constructor(startingPoint: TPoint) {
    this.particules.push(`M${startingPoint.x} ${startingPoint.y}`)
  }

  lineTo(target: TPoint) {
    this.particules.push(`L${target.x} ${target.y}`)
  }

  close() {
    this.particules.push("Z")
  }

  toString() {
    return this.particules.join(",")
  }
}
