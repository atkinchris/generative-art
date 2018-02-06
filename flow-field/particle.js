class Particle {
  constructor(p, x, y) {
    this.p = p
    this.position = p.createVector(x, y)
    this.velocity = p.createVector(0, 0)
    this.acceleration = p.createVector(0, 0)
    this.maxspeed = 4

    this.previousPosition = this.position
  }

  update(force) {
    this.previousPosition = this.p.createVector(
      this.position.x,
      this.position.y,
    )

    this.acceleration.add(force)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  draw() {
    const { p } = this

    p.push()
    p.fill(1)
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
