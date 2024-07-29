import * as fs from 'node:fs'
import * as SparkMD5 from 'spark-md5'

export class Md5Utils {
  static getFileMD5(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        const blobSlice =
          (File as any).prototype.slice || (File as any).prototype.mozSlice || (File as any).prototype.webkitSlice
        const chunkSize = 2097152 // 以每片2MB大小来逐次读取
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()

        fileReader.onload = async (e) => {
          spark.append(e.target?.result as ArrayBuffer)
          currentChunk++
          if (currentChunk < chunks) {
            loadNext()
          } else {
            resolve(spark.end())
          }
        }

        const loadNext = () => {
          const start = currentChunk * chunkSize
          const end = start + chunkSize >= file.size ? file.size : start + chunkSize
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }

        loadNext()
      } catch (err) {
        reject('')
      }
    })
  }

  static fetchFileFromPath(filePath: string) {
    return new Promise<File>((resolve) => {
      fs.readFile(filePath, (_, data) => {
        if (_) {
          return
        }
        const file = new File([data], Date.now().toString())
        resolve(file)
      })
    })
  }
}
