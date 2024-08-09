export class PhotoUtils {
  // 对 png 的压缩反而更大
  static canvasDataURL(file: File, quality = 0.2) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        const img = document.createElement('img')
        const canvas = document.createElement('canvas')
        const drawer = canvas.getContext('2d')
        img.src = this.result as string
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          drawer?.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob(
            function (blob) {
              resolve(blob)
            },
            file.type,
            quality
          )
        }
      }
    })
  }
}
