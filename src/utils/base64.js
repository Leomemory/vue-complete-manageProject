//在线图片转base64
export function URLImgToBase64 (img) {
  return new Promise((resolve, reject) => {
    function getBase64Image (img) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      var dataURL = canvas.toDataURL()
      return dataURL
    }

    const image = new Image()
    image.crossOrigin = '*'  // 允许跨域图片
    image.src = img + '?v=' + Math.random()  // 清除图片缓存
    image.onload = function () {
      resolve(getBase64Image(image))
    }
    image.onerror = reject
  })
}

//本地图片文件转base64
export function uploadImgToBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {  // 图片转base64完成后返回reader对象
      resolve(reader)
    }
    reader.onerror = reject
  })
}