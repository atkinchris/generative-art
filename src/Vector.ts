class Vector {
  public static add(a: Vector, b: Vector | number) {
    if (b instanceof Vector) {
      return new Vector(a.x + b.x, a.y + b.y)
    }

    return new Vector(a.x + b, a.y + b)
  }

  public static subtract(a: Vector, b: Vector | number) {
    if (b instanceof Vector) {
      return new Vector(a.x - b.x, a.y - b.y)
    }

    return new Vector(a.x - b, a.y - b)
  }

  public static multiply(a: Vector, b: Vector | number) {
    if (b instanceof Vector) {
      return new Vector(a.x * b.x, a.y * b.y)
    }

    return new Vector(a.x * b, a.y * b)
  }

  public static divide(a: Vector, b: Vector | number) {
    if (b instanceof Vector) {
      return new Vector(a.x / b.x, a.y / b.y)
    }

    return new Vector(a.x / b, a.y / b)
  }

  public static dot(a: Vector, b: Vector) {
    return a.x * b.x + a.y * b.y
  }

  public readonly x: number
  public readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(v: Vector | number) {
    return Vector.add(this, v)
  }

  public subtract(v: Vector | number) {
    return Vector.subtract(this, v)
  }

  public multiply(v: Vector | number) {
    return Vector.multiply(this, v)
  }

  public divide(v: Vector | number) {
    return Vector.divide(this, v)
  }

  public dot(v: Vector) {
    return Vector.dot(this, v)
  }
}

export default Vector
