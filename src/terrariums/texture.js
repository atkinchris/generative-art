import texture from './texture.jpeg'

const applyTexture = ctx => {
  const image = new Image()

  image.onload = () => {
    ctx.globalAlpha = 0.3
    ctx.globalCompositeOperation = 'source-atop'
    ctx.drawImage(image, -200, -1500)
  }

  image.src = texture
}

export default applyTexture
