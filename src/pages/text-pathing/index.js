import vectorizeText from 'vectorize-text'

import { withSketch } from '../../components/Sketch'
import { distance } from '../../utils'

import Triangle from './triangle'

const sketch = p => {
  const width = 400
  const height = 400
  const circles = []
  const center = {
    x: width / 2,
    y: height / 2,
  }
  const canvasRadius = width / 2
  const text = 'Chris'
  const { positions, cells } = vectorizeText('CHRIS', {
    font: 'Sans-serif',
    triangles: true,
    width: width * 0.75,
    textBaseline: 'hanging',
  })

  const offsetPositions = positions.map(position => [
    position[0] + width * 0.125,
    position[1] + (height / 2 - text.length * 8),
  ])

  const triangles = cells.map(
    cell => new Triangle([offsetPositions[cell[0]], offsetPositions[cell[1]], offsetPositions[cell[2]]])
  )

  const groups = [
    { radius: 16, saturation: 0.1, max: 20 },
    { radius: 12, saturation: 0.4, max: 50 },
    { radius: 8, saturation: 0.6, max: 200 },
    { radius: 6, saturation: 0.2 },
  ]
  const DEFAULT_HUE = p.random(128, 196)
  const DEFAULT_BRIGHTNESS = 255

  const packCircles = config => {
    const {
      radius,
      hue = DEFAULT_HUE,
      saturation,
      brightness = DEFAULT_BRIGHTNESS,
      max = Number.MAX_SAFE_INTEGER,
    } = config
    let retries = 20000
    let count = 0

    while (count < max && retries > 0) {
      const newCircle = {
        x: p.random(radius, width - radius),
        y: p.random(radius, height - radius),
        radius,
        hue,
        saturation,
        brightness,
      }
      const test = circle => distance(circle, newCircle) < (radius + circle.radius) / 2
      const withinCanvas = distance(center, newCircle) < canvasRadius - radius / 2
      const withinText = triangles.some(tri => tri.contains([newCircle.x, newCircle.y]))

      if (withinText) {
        newCircle.hue = 127 - newCircle.hue
      }

      if (withinCanvas && !circles.some(test)) {
        circles.push(newCircle)
        count += 1
      } else {
        retries -= 1
      }
    }
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noStroke()
    p.noLoop()

    groups.forEach(packCircles)
  }

  p.draw = () => {
    circles.forEach(circle => {
      p.fill(circle.hue, circle.saturation * 255, circle.brightness)
      p.ellipse(circle.x, circle.y, circle.radius)
    })
  }
}

export default withSketch(sketch)
