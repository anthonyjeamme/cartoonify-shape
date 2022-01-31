import React from "react"
import { baseShapes } from "~data/baseShapes"
import { TShape } from "~utils/shape/Shape.types"
import { baseShapeParamDefinitionToParam } from "~utils/shape/Shape.utils"

import "./BasicShapes.scss"

const BasicShapes = ({ baseShape, setBaseShape }) => {
  return (
    <div className="BasicShapes">
      <h2>Base shape </h2>

      <ShapeSelector baseShape={baseShape} setBaseShape={setBaseShape} />

      {baseShape && (
        <ShapeParams baseShape={baseShape} setBaseShape={setBaseShape} />
      )}
    </div>
  )
}

export default BasicShapes

const ShapeSelector = ({ baseShape, setBaseShape }) => {
  return (
    <div className="ShapeSelector">
      {baseShapes.map(baseShapeDefinition => (
        <button
          className={
            baseShape?.name === baseShapeDefinition.name ? "active" : ""
          }
          key={baseShapeDefinition.name}
          onClick={() => {
            const params = baseShapeParamDefinitionToParam(
              baseShapeDefinition.params
            )

            const shape: TShape = {
              name: baseShapeDefinition.name,
              params,
              points: baseShapeDefinition.generator(params),
            }

            setBaseShape(shape)
          }}
        >
          {baseShapeDefinition.label}
        </button>
      ))}
    </div>
  )
}

const ShapeParams = ({ baseShape, setBaseShape }) => {
  const recomputePoints = shape => {
    const definition = baseShapes.find(({ name }) => name === shape.name)
    if (!definition) throw `Can't find ${shape.name} base shape.`
    return definition.generator(shape.params)
  }

  return (
    <div className="ShapeParams">
      {Object.entries(baseShape.params).map(
        ([param, value]: [string, number]) => (
          <ShapeParam
            key={param}
            label={param}
            value={value}
            handleChange={value => {
              const shape = {
                ...baseShape,
                params: {
                  ...baseShape.params,
                  [param]: value,
                },
              }

              const points = recomputePoints(shape)

              setBaseShape({
                ...shape,
                points,
              })
            }}
          />
        )
      )}
    </div>
  )
}

const ShapeParam = ({ label, value, handleChange }) => {
  return (
    <div className="ShapeParam">
      <div className="label">{label}</div>
      <input
        value={value}
        onChange={e => {
          const value = parseInt(e.target.value, 10)
          handleChange(value)
        }}
        type="number"
      />
    </div>
  )
}
