import { DiceFour } from "phosphor-react"
import React from "react"

import uniqid from "uniqid"

import "./Seed.scss"

const Seed = ({ seed, handleChangeSeed }) => {
  return (
    <div className="Seed">
      <h2>Seed</h2>

      <div className="line">
        <input
          value={seed}
          onChange={e => {
            handleChangeSeed(e.target.value)
          }}
        />
        <button
          onClick={() => {
            handleChangeSeed(uniqid())
          }}
        >
          <DiceFour />
        </button>
      </div>
    </div>
  )
}

export default Seed
