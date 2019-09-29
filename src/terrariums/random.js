const randomBetween = (min, max) => Math.random() * (max - min) + min
const randomAngle = () => (Math.PI / 3) * (Math.random() - 0.5)
const randomOffshoot = start => {
  const angle = (Math.PI / 2) * Math.random()
  const direction = Math.random() - 0.5

  return direction < 0 ? start - angle : start + angle
}
const randomApprox = (iterations = 6) => {
  let rand = 0

  for (let i = 0; i < iterations; i += 1) {
    rand += Math.random()
  }

  rand -= iterations / 2

  return rand / iterations
}

export { randomBetween, randomAngle, randomOffshoot, randomApprox }
