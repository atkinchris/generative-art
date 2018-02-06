const buildField = (p, { width, height, scale = 20 }) => {
  const field = []

  const angleHeading = 0
  const angleScale = 0.25
  const noiseScale = 0.01 * scale
  const widthScaled = Math.floor(width / scale)
  const heightScaled = Math.floor(height / scale)

  for (let y = 0; y < heightScaled; y += 1) {
    for (let x = 0; x < widthScaled; x += 1) {
      const index = (widthScaled * y) + x
      const r = p.noise(x * noiseScale, y * noiseScale)
      const angle = p.radians((r * angleScale * 360) + (-45 + angleHeading))
      const vector = p5.Vector.fromAngle(angle)
      vector.setMag(0.01)

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

    p.stroke(50, 0.5)
    p.fill(50, 0.5)
    p.strokeWeight(length * 0.2)

    p.translate(canvasX, canvasY)
    p.rotate(vector.heading())
    p.line(0, 0, length, 0)
    p.triangle(
      length / 2,
      length * 0.2,
      length,
      0,
      length / 2,
      length * -0.2,
    )

    p.pop()
  })

  const getVector = ({ x, y }) => field[
    Math.floor(y / scale) + Math.floor(x / scale)
  ]

  return {
    draw,
    getVector,
  }
}

window.buildField = buildField
