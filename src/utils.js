class Rect {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  contains(point) {
    const { x, y, width, height } = this

    return (
      point.x - point.radius <= x + width &&
      point.x + point.radius >= x &&
      (point.y - point.radius <= y + height && point.y + point.radius >= y)
    )
  }
}

const distance = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)

export { Rect, distance }
