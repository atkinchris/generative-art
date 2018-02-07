/* globals buildField: false, Particle: false */
const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const center = { x: width / 2, y: width / 2 }
  const particleLife = 20
  const particleCount = 3000
  const paricleOrigin = {
    x: width * 0.75,
    y: height * 0.75,
  }
  const particleSpread = {
    x: width * 0.25,
    y: height * 0.25,
  }

  const field = buildField(p, { width, height })
  let particles = Array.from({ length: particleCount }).map(() => (
    new Particle(p, {
      x: p.randomGaussian(paricleOrigin.x, particleSpread.x),
      y: p.randomGaussian(paricleOrigin.y, particleSpread.y),
      life: p.randomGaussian(particleLife),
    })
  ))

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    // p.noLoop()
  }

  p.draw = () => {
    // field.draw()

    particles = particles.filter((particle) => {
      const force = field.getVector(particle.position)

      particle.update(force)

      if (
        particle.distanceFrom(center) > 150 ||
        particle.isDead()
      ) {
        return false
      }

      particle.draw()
      return true
    })

    if (particles.length <= 0) {
      console.log('Stopping loop.')
      p.noLoop()
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
