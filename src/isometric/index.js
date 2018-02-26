import drawIsoCube from './isoCube'

const container = document.querySelector('.container')

const sketch = () => {
  const width = 400
  const height = 400
  const size = 100

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')

  drawIsoCube(ctx, { x: 200, y: 200, size })

  container.appendChild(canvas)
}

sketch()
