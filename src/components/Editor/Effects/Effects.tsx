import React, { useRef, useState } from "react"

import {
  ArrowDown,
  ArrowUp,
  CaretDown,
  Eye,
  EyeClosed,
  EyeSlash,
  Plus,
  Trash,
} from "phosphor-react"

import { useClickOutside } from "@ajeamme/use-click-outside"

import AddEffectDropdown from "./AddEffectDropdown/AddEffectDropdown"
import {
  TEffectComponentProps,
  TEffectInputsComponentProps,
} from "./Effects.types"

import "./Effects.scss"

const Effects = ({ effects, setEffects }) => {
  return (
    <div className="Effects">
      <h2>Effects</h2>
      {effects.map((effect, index) => (
        <Effect
          key={effect.id}
          effect={effect}
          handleRemove={() => {
            setEffects(effects.filter(({ id }) => id !== effect.id))
          }}
          handleMoveUp={() => {
            if (index === 0) return
            setEffects([
              ...effects.slice(0, index - 1),

              effects[index],
              effects[index - 1],
              ...effects.slice(index + 1),
            ])
          }}
          handleMoveDown={() => {
            if (index === effects.length - 1) return

            setEffects([
              ...effects.slice(0, index),

              effects[index + 1],
              effects[index],
              ...effects.slice(index + 2),
            ])
          }}
          handleChange={value => {
            setEffects(
              effects.map(_ =>
                _.id === effect.id
                  ? {
                      ..._,
                      ...value,
                    }
                  : _
              )
            )
          }}
        />
      ))}

      <AddEffectButton
        handleAddEffect={effect => {
          setEffects([...effects, effect])
        }}
      />
    </div>
  )
}

export default Effects

const Effect = ({
  effect,
  handleChange,
  handleRemove,
  handleMoveUp,
  handleMoveDown,
}: TEffectComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  console.log(effect)

  return (
    <div className="Effect">
      <header>
        <div className="label">
          <button
            className={`expand${isExpanded ? " expanded" : ""}`}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            <CaretDown />
          </button>

          {effect.definition.label}
        </div>
        <div>
          <button
            className="icon"
            onClick={() => {
              handleChange({
                ...effect,
                enabled: !effect.enabled,
              })
            }}
          >
            {effect.enabled ? <Eye /> : <EyeSlash />}
          </button>
          <button className="icon" onClick={handleMoveUp}>
            <ArrowUp />
          </button>
          <button className="icon" onClick={handleMoveDown}>
            <ArrowDown />
          </button>
          <button className="icon" onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      </header>

      {isExpanded && (
        <div className="panel">
          <EffectInputs effect={effect} handleChange={handleChange} />
        </div>
      )}
    </div>
  )
}

const EffectInputs = ({
  effect,
  handleChange,
}: TEffectInputsComponentProps) => {
  const inputs = Object.values(effect.definition.inputs)

  return (
    <div className="EffectInputs">
      {inputs.map(input =>
        input.type === "number" ? (
          <NumberParam
            key={input.name}
            input={input}
            effect={effect}
            handleChange={handleChange}
          />
        ) : input.type === "select" ? (
          <SelectParam
            key={input.name}
            input={input}
            effect={effect}
            handleChange={handleChange}
          />
        ) : null
      )}
    </div>
  )
}

const NumberParam = ({ input, effect, handleChange }) => (
  <div>
    {input.label} :{" "}
    <input
      type="number"
      defaultValue={effect.inputs[input.name]}
      min={input.min || undefined}
      max={input.max || undefined}
      step={input.step || undefined}
      onChange={e => {
        const value = parseInt(e.target.value, 10)
        handleChange({
          ...effect,
          inputs: {
            ...effect.inputs,
            [input.name]: value,
          },
        })
      }}
    />
  </div>
)

const SelectParam = ({ input, effect, handleChange }) => {
  const value = effect.inputs[input.name]

  return (
    <div>
      {input.label} :
      <div className="select">
        {input.options.map(option => (
          <button
            className={option.value === value ? "active" : ""}
            onClick={() => {
              handleChange({
                ...effect,
                inputs: {
                  ...effect.inputs,
                  [input.name]: option.value,
                },
              })
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      {/* <select
        value={effect.inputs[input.name]}
        onChange={e => {
          const { value } = e.target

          handleChange({
            ...effect,
            inputs: {
              ...effect.inputs,
              [input.name]: value,
            },
          })
        }}
      >
        {input.options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select> */}
    </div>
  )
}

const AddEffectButton = ({ handleAddEffect }) => {
  const rootRef = useRef<HTMLDivElement>()
  const [isOpen, setIsOpen] = useState(false)

  useClickOutside(isOpen, setIsOpen, rootRef)

  return (
    <div className="AddEffectButton" ref={rootRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Plus />
      </button>

      <AddEffectDropdown
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false)
        }}
        handleAddEffect={handleAddEffect}
      />
    </div>
  )
}
