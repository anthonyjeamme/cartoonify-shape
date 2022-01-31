import React from "react"
import uniqid from "uniqid"

import { effectsDefinitions } from "~data/effects"
import { TEffect, TEffectDefinition } from "~utils/effect/effect.types"

import "./AddEffectDropdown.scss"

const AddEffectDropdown = ({ isOpen, handleClose, handleAddEffect }) => {
  return (
    <div className={`AddEffectDropdown${isOpen ? " active" : ""}`}>
      <div>
        {effectsDefinitions.map(effectDefinition => (
          <button
            key={effectDefinition.name}
            onClick={() => {
              handleAddEffect(createEffectFromDefinition(effectDefinition))
              handleClose()
            }}
          >
            {effectDefinition.label}
          </button>
        ))}
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default AddEffectDropdown

const createEffectFromDefinition = (
  definition: TEffectDefinition
): TEffect => ({
  id: uniqid(),
  inputs: definition.inputs.reduce((acc, input) => {
    acc[input.name] = input.defaultValue
    return acc
  }, {}),
  definition,
  enabled: true,
})
