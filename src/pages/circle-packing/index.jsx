import { withSketch } from '../../components/Sketch'
import { Rect, distance } from '../../utils'

const sketch = p => {
  const width = 400
  const height = 400
  const circles = []
  const center = {
    x: width / 2,
    y: height / 2,
  }
  const canvasRadius = width / 2
  const groups = [
    { radius: 16, saturation: 0.1, max: 20 },
    { radius: 12, saturation: 0.4, max: 50 },
    { radius: 8, saturation: 0.6, max: 200 },
    { radius: 6, saturation: 0.2 },
  ]
  const DEFAULT_HUE = p.random(128, 196)
  const DEFAULT_BRIGHTNESS = 255

  const rects = [new Rect(120, 100, 50, 180), new Rect(120, 100, 160, 50), new Rect(120, 250, 160, 50)]

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
      const withinRect = rects.some(rect => rect.contains(newCircle))

      if (withinRect) {
        newCircle.hue -= 64
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
