import { Point } from './poisson'

// http://paulbourke.net/geometry/pointlineplane/javascript.txt
const intersect = (a1: Point, b1: Point, a2: Point, b2: Point): Point | null => {
  // Check if none of the lines are of length 0
  if ((a1.x === b1.x && a1.y === b1.y) || (a2.x === b2.x && a2.y === b2.y)) {
    return null
  }

  const denominator = (b2.y - a2.y) * (b1.x - a1.x) - (b2.x - a2.x) * (b1.y - a1.y)

  // Lines are parallel
  if (denominator === 0) {
    return null
  }

  const ua = ((b2.x - a2.x) * (a1.y - a2.y) - (b2.y - a2.y) * (a1.x - a2.x)) / denominator
  const ub = ((b1.x - a1.x) * (a1.y - a2.y) - (b1.y - a1.y) * (a1.x - a2.x)) / denominator

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return null
  }

  // Return a object with the x and y coordinates of the intersection
  const x = a1.x + ua * (b1.x - a1.x)
  const y = a1.y + ua * (b1.y - a1.y)

  return { x, y }
}

const isBetween = (a: Point, b: Point, c: Point, tolerance = 0) => {
  const distance =
    Math.abs((c.y - b.y) * a.x - (c.x - b.x) * a.y + c.x * b.y - c.y * b.x) /
    Math.sqrt(Math.pow(c.y - b.y, 2) + Math.pow(c.x - b.x, 2))
  if (distance > tolerance) {
    return false
  }

  const dotproduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y)
  if (dotproduct < 0) {
    return false
  }

  const squaredlengthba = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)
  if (dotproduct > squaredlengthba) {
    return false
  }

  return true
}

export { intersect, isBetween }
