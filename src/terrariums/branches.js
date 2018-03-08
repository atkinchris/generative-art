import { buildBranch } from './branch'
import { randomBetween } from './random'

const branchCount = 32
const branches = [
  [
    [300, 200],
    [320, 161],
    [340, 133],
    [360, 114],
    [380, 105],
    [400, 106],
    [420, 116],
    [440, 137],
    [460, 167],
    [446, 207],
    [455, 257],
    [444, 317],
    [456, 386],
    [450, 400],
    [436, 466],
    [420, 500],
    [423, 555],
  ],
  [
    [444, 317],
    [460, 340],
    [490, 347],
    [500, 337],
  ],
]

for (let b = 0; b < branchCount; b += 1) {
  branches.push(buildBranch(
    randomBetween(260, 370),
    200,
    randomBetween(10, 22) / 10,
    randomBetween(3, 8),
  ))
}

for (let b = 0; b < branchCount; b += 1) {
  branches.push(buildBranch(
    randomBetween(260, 370),
    200,
    Math.PI / 2,
    randomBetween(6, 8),
  ))
}

branches.push(buildBranch(
  330,
  180,
  2 * (Math.PI / 3),
  12,
))

export default branches
