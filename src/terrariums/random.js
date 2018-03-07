const randomBetween = (min, max) => (Math.random() * (max - min)) + min
const randomAngle = () => (Math.PI / 3) * (Math.random() - 0.5)
const randomOffshoot = (start) => {
  const angle = (Math.PI / 2) * Math.random()
  const direction = Math.random() - 0.5

  return direction < 0 ? start - angle : start + angle
}

export {
  randomBetween,
  randomAngle,
  randomOffshoot,
}
