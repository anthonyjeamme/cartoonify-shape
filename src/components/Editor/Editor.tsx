import React, { useEffect, useState } from "react"
import uniqid from "uniqid"
import Renderer from "./Renderer/Renderer"

import BasicShapes from "./BasicShapes/BasicShapes"

import { TShape } from "~utils/shape/Shape.types"
import { TEffect } from "~utils/effect/effect.types"
import { TPoint } from "~utils/math/Point/Point.types"

import Effects from "./Effects/Effects"

import Point from "~utils/math/Point/Point"
import Seed from "./Seed/Seed"

import "./Editor.scss"
import Export from "./Export/Export"
import { roundPoints } from "~utils/shape/Shape.utils"

const Editor = () => {
  const [baseShape, setBaseShape] = useState<TShape>(null)

  const [points, setPoints] = useState<TPoint[]>([])
  const [seed, setSeed] = useState<string>(uniqid())
  const [effects, setEffects] = useState<TEffect[]>([])

  const computePoints = () => {
    let points = baseShape.points

    for (const effect of effects) {
      points = roundPoints(
        effect.definition.apply(points, effect.inputs, seed + effect.id)
      )
    }

    setPoints(points)
  }

  useEffect(() => {
    if (baseShape) computePoints()
  }, [baseShape, effects, seed])

  return (
    <div className="Editor">
      <h1>Editeur</h1>

      <BasicShapes baseShape={baseShape} setBaseShape={setBaseShape} />

      <Seed seed={seed} handleChangeSeed={setSeed} />

      {baseShape && <Effects effects={effects} setEffects={setEffects} />}

      {points.length > 0 && <Renderer points={points} />}

      {points.length > 0 && <Export points={points} />}
    </div>
  )
}

export default Editor
