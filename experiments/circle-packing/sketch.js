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
  const config = [
    { max: 15, radius: 30, colour: '#48466D' },
    { max: 50, radius: 20, colour: '#3D84A8' },
    { max: 200, radius: 10, colour: '#46CDCF' },
    { max: undefined, radius: 5, colour: '#ABEDD8' },
  ]

  const distance = (a, b) => Math.sqrt((
    ((b.x - a.x) ** 2) + ((b.y - a.y) ** 2)
  ))

  const packCircles = ({ radius, colour, max = Number.MAX_SAFE_INTEGER }) => {
    let retries = 2000
    let count = 0

    while (count < max && retries > 0) {
      const newCircle = {
        x: p.random(radius, width - radius),
        y: p.random(radius, height - radius),
        radius,
        colour,
      }
      const test = circle => distance(circle, newCircle) < (radius + circle.radius) / 2
      const withinCanvas = distance(center, newCircle) < canvasRadius

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

    config.forEach(packCircles)
  }

  p.draw = () => {
    circles.forEach((circle) => {
      p.fill(circle.colour)
      p.ellipse(circle.x, circle.y, circle.radius)
    })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
