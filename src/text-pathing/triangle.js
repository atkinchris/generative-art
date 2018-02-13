const sign = (p1, p2, p3) => (
  ((p1[0] - p3[0]) * (p2[1] - p3[1])) -
  ((p2[0] - p3[0]) * (p1[1] - p3[1]))
)

class Triangle {
  constructor(points) {
    this.points = points
  }

  draw(p) {
    const a = this.points[0]
    const b = this.points[1]
    const c = this.points[2]

    p.triangle(
      a[0], a[1],
      b[0], b[1],
      c[0], c[1],
    )
  }

  contains(point) {
    const a = this.points[0]
    const b = this.points[1]
    const c = this.points[2]
    const b1 = sign(point, a, b) < 0
    const b2 = sign(point, b, c) < 0
    const b3 = sign(point, c, a) < 0

    return ((b1 === b2) && (b2 === b3))
  }
}

export default Triangle
