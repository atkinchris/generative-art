const buildField = (p, { width, height, scale = 10 }) => {
  const field = []

  const widthScaled = Math.floor(width / scale)
  const heightScaled = Math.floor(height / scale)
  const noiseScale = 0.01 * scale

  for (let y = 0; y < heightScaled; y += 1) {
    for (let x = 0; x < widthScaled; x += 1) {
      const index = (widthScaled * y) + x
      const r = p.noise(x * noiseScale, y * noiseScale)
      const vector = p5.Vector.fromAngle(r * p.TWO_PI)

      field[index] = vector
    }
  }

  const draw = () => field.forEach((vector, index) => {
    const x = index % widthScaled
    const y = Math.floor(index / heightScaled)
    const canvasX = (x * scale) + (scale / 2)
    const canvasY = (y * scale) + (scale / 2)
    const length = 0.5 * scale
    p.push()

    p.translate(canvasX, canvasY)
    p.rotate(vector.heading())
    p.line(0, 0, length, 0)

    p.pop()
  })

  return {
    draw,
  }
}

window.buildField = buildField
