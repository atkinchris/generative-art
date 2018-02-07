const MAX_VELOCITY = 2
const INI_VELOCITY = 2

class Particle {
  constructor(p, x, y) {
    this.p = p
    this.position = p.createVector(x, y)
    this.acceleration = p.createVector(0, 0)

    this.velocity = p5.Vector.fromAngle(0)
    this.velocity.setMag(INI_VELOCITY)

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
  }

  draw() {
    const { p } = this

    p.push()
    p.stroke(0, 0.25)
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
