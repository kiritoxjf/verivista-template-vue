import SparkMD5 from 'spark-md5'
import type { iChunk } from './interfaces'

onmessage = async (e) => {
  const promises = []
  const { file, CHUNK_SIZE, startIndex, endIndex } = e.data
  for (let i = startIndex; i < endIndex; i++) {
    promises.push(createFileChunk(file, i, CHUNK_SIZE))
  }
  const chunks = await Promise.all(promises)
  postMessage(chunks)
}

// 创建分片
const createFileChunk = (file: File, index: number, size: number): Promise<iChunk> => {
  return new Promise((resolve, reject) => {
    const start = index * size
    const end = Math.min(start + size, file.size)
    const chunk = file.slice(start, end)
    const reader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    reader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve({ index, hash: spark.end(), chunk: e.target?.result as string })
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsArrayBuffer(chunk)
  })
}
