/* globals buildField: false, Particle: false */
const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const center = { x: width / 2, y: width / 2 }
  const particleLife = 20
  const particleCount = 3000
  const paricleOrigin = {
    x: width * 0.25,
    y: height * 0.75,
  }
  const particleSpread = {
    x: width * 0.3,
    y: height * 0.2,
  }

  const field = buildField(p, { width, height })
  let particles = Array.from({ length: particleCount }).map((_, i) => (
    new Particle(p, {
      x: p.randomGaussian(paricleOrigin.x + (i / 100), particleSpread.x),
      y: p.randomGaussian(paricleOrigin.y + (i / 100), particleSpread.y),
      life: particleLife,
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
      const { x, y } = particle.position
      const force = field.getVector(x, y)

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
