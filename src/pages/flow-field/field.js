import p5 from 'p5/lib/p5.min'

const buildField = (p, { width, height, scale = 20 }) => {
  const fieldStrength = 0.35
  const angleHeading = 270
  const angleScale = 0.5
  const noiseScale = 0.007

  const getVector = (x, y) => {
    const r = p.noise(x * noiseScale, y * noiseScale)
    const angle = p.radians(r * angleScale * 360 + (-45 + angleHeading))
    const vector = p5.Vector.fromAngle(angle)
    vector.setMag(fieldStrength)

    return vector
  }

  const drawVector = (vector, x, y) => {
    const length = 0.5 * scale
    p.push()

    p.stroke(50, 0.5)
    p.fill(50, 0.5)
    p.strokeWeight(length * 0.2)

    p.translate(x, y)
    p.rotate(vector.heading())
    p.line(0, 0, length, 0)
    p.triangle(length / 2, length * 0.2, length, 0, length / 2, length * -0.2)

    p.pop()
  }

  const draw = () => {
    for (let y = 0; y < height; y += scale) {
      for (let x = 0; x < width; x += scale) {
        const vector = getVector(x, y)
        drawVector(vector, x, y)
      }
    }
  }

  return {
    draw,
    getVector,
  }
}

export default buildField
