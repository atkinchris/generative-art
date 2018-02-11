const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const hours = 12
  const handLength = 12
  const hoursLength = handLength * 0.65
  const center = {
    x: width / 2,
    y: width / 2,
  }

  const drawFace = () => {
    p.push()
    p.fill('white')
    p.noStroke()
    p.ellipse(center.x, center.y, width)
    p.pop()
  }

  const drawNumber = (x, y, hour) => {
    const angle = hour * (p.TWO_PI / hours)
    p.push()
    p.translate(x, y)
    p.strokeWeight(2)
    p.line(0, 0, 0, -handLength)
    p.rotate(angle)
    p.line(0, 0, hoursLength, 0)
    p.pop()
  }

  const drawNumbers = () => {
    const radius = (width / 2) - (handLength * 2)
    const angle = p.TWO_PI / hours
    let hour = 0

    for (let a = 0; a < p.TWO_PI; a += angle) {
      drawNumber(
        center.x + (Math.cos(a) * radius),
        center.y + (Math.sin(a) * radius),
        hour,
      )
      hour += 1
    }
  }

  const drawHand = (rotation, minutes) => {
    const unit = p.TWO_PI / (minutes ? 60 : hours)
    const angle = unit * rotation
    const length = minutes ? handLength : hoursLength

    p.push()
    p.strokeWeight(6)
    p.translate(center.x, center.y)
    p.rotate(angle)
    p.line(0, 20, 0, -length * 10)
    p.pop()
  }

  const drawHands = () => {
    const time = new Date()

    drawHand(time.getHours() % 12)
    drawHand(time.getMinutes(), true)
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.noFill()
    p.strokeCap(p.PROJECT)
  }

  p.draw = () => {
    drawFace()
    drawNumbers()
    drawHands()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
