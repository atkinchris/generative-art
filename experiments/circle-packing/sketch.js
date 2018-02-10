const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const circles = []
  const center = {
    x: width / 2,
    y: height / 2,
  }
  const canvasRadius = width / 2
  const groups = [
    { radius: 30, saturation: 0.2, max: 20 },
    { radius: 20, saturation: 0.3, max: 50 },
    { radius: 10, saturation: 0.4, max: 200 },
    { radius: 5, saturation: 0.5 },
  ]
  const DEFAULT_HUE = 200
  const DEFAULT_BRIGHTNESS = 96

  const distance = (a, b) => Math.sqrt((
    ((b.x - a.x) ** 2) + ((b.y - a.y) ** 2)
  ))

  const packCircles = (config) => {
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
      const withinCanvas = distance(center, newCircle) < canvasRadius - (radius / 2)

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
    circles.forEach((circle) => {
      p.fill(
        circle.hue,
        circle.saturation * 255,
        circle.brightness,
      )
      p.ellipse(circle.x, circle.y, circle.radius)
    })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
