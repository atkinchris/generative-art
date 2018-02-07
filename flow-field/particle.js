const MAX_VELOCITY = 2

class Particle {
  constructor(p, { x, y, life }) {
    this.p = p
    this.life = life
    this.position = p.createVector(x, y)
    this.acceleration = p.createVector(0, 0)
    this.velocity = p.createVector(0, 0)

    this.previousPosition = this.position
  }

  update(force) {
    this.previousPosition = this.p.createVector(
      this.position.x,
      this.position.y,
    )

    this.acceleration.add(force)
    this.velocity.add(this.acceleration)
    this.velocity.limit(MAX_VELOCITY)
    this.position.add(this.velocity)
    this.acceleration.mult(0)

    this.life -= 1
  }

  isDead() {
    return this.life <= 0
  }

  distanceFrom({ x, y }) {
    return Math.sqrt((
      ((x - this.position.x) ** 2) +
      ((y - this.position.y) ** 2)
    ))
  }

  draw() {
    const { p } = this

    p.push()
    p.stroke(0, 0.09)
    p.strokeWeight(1)
    p.line(
      this.previousPosition.x,
      this.previousPosition.y,
      this.position.x,
      this.position.y,
    )
    p.pop()
  }
}

window.Particle = Particle
