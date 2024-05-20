<script setup lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { ref } from 'vue'
import Worker from './worker.ts?worker'
import type { iChunk } from './interfaces'

const CHUNK_SIZE = 1024 * 1024 * 10 // 10MB
const THREAD_COUNT = 4 // 并发数

const fileList = ref<File[]>([])
const chunkList = ref<iChunk[]>([])

// 选择文件
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [file]
  handleFileChunk(file)
  return false
}

// 移除文件
const handleRemove: UploadProps['onRemove'] = () => {
  fileList.value = []
}

// 文件分片
const handleFileChunk = async (file: File) => {
  return new Promise((resolve, reject) => {
    const result: iChunk[] = []
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
    let finishCount = 0
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker()
      const startIndex = i * workerChunkCount
      const endIndex =
        startIndex + workerChunkCount > chunkCount ? chunkCount : startIndex + workerChunkCount
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex
      })
      // Worker成功回调
      worker.onmessage = (e) => {
        for (let i = startIndex; i < endIndex; i++) {
          result[i] = e.data[i - startIndex]
        }
        worker.terminate()
        finishCount++
        if (finishCount === THREAD_COUNT) {
          chunkList.value = result
          resolve(result)
        }
      }
      // Worker失败回调
      worker.onerror = (error) => {
        reject(error)
      }
    }
  })
}
</script>
<template>
  <div class="file-cut flex-box">
    <a-upload
      name="file"
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        选择文件
      </a-button>
    </a-upload>
    <div class="chunk-list">
      <a-card v-for="chunk in chunkList" :key="chunk.index" style="width: 25rem" :bordered="false">
        {{ `分片${chunk.index}` }} - {{ chunk.hash }}
      </a-card>
    </div>
  </div>
</template>
<style scoped lang="less">
.file-cut {
  .chunk-list {
    max-height: 20rem;
    overflow: auto;
  }
}
</style>
