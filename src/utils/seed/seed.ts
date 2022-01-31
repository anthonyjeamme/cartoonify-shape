import seedrandomlib from "seedrandom"

export const seedRandom = (seed: string) => {
  return seedrandomlib(seed)()
}
