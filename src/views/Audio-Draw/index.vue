<script setup lang="ts" name="audio-draw">
import { ref, h, onMounted } from 'vue'
import { UploadOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'

let audioRef = ref<HTMLMediaElement>(new Audio())
let isInit = false
let audioAnalyser: AnalyserNode
const audioArray = ref<Uint8Array>(new Uint8Array(512).fill(0))
const canvasRef = ref<HTMLCanvasElement>()
const fileList = ref<File[]>([])
const state = ref<boolean>(false)

const beforeUpload: UploadProps['beforeUpload'] = (file: File) => {
  fileList.value = [file]
  return false
}

// 播放
const play = () => {
  if (fileList.value.length === 0) {
    // 使用远程OSS音源
    audioRef.value.crossOrigin = 'anonymous' // 跨域Cors
    audioRef.value.src = 'https://oss.verivista.cn/music/SunnyDay.mp3'
    audioRef.value.play()
    state.value = !state.value
  } else {
    // 使用本地音源
    const file = fileList.value[0]
    const reader = new FileReader()
    reader.onload = () => {
      audioRef.value.src = reader.result as string
      audioRef.value.play()
    }
    reader.readAsDataURL(file)
    state.value = !state.value
  }
}

// 暂停
const pause = () => {
  if (audioRef.value) {
    audioRef.value.pause()
    state.value = !state.value
  }
}

// 绘制Canvas
const draw = () => {
  requestAnimationFrame(draw)
  const { width, height } = canvasRef.value || { width: 0, height: 0 }
  const ctx = canvasRef.value?.getContext('2d')
  ctx?.clearRect(0, 0, width, height)
  if (ctx) ctx.fillStyle = '#5aa4ae'

  audioAnalyser.getByteFrequencyData(audioArray.value)
  const len = audioArray.value.length / 5
  const nodeWidth = width / len / 2
  for (let i = 0; i < len; i++) {
    const audioNode = audioArray.value[i]
    const nodeHeight = (audioNode / 255) * height
    // 对称从中向左向右绘制
    const x1 = i * nodeWidth + width / 2
    const x2 = width / 2 - (i + 1) * nodeWidth
    const y = height - nodeHeight
    ctx?.fillRect(x1, y, nodeWidth - 2, nodeHeight)
    ctx?.fillRect(x2, y, nodeWidth - 2, nodeHeight)
  }
}

// 初始化Audio分析器
const init = (audio: HTMLMediaElement) => {
  audio.onplay = () => {
    if (isInit) return
    const audCtx = new AudioContext()
    // 音频源节点
    const source = audCtx.createMediaElementSource(audio)
    // 分析器
    audioAnalyser = audCtx.createAnalyser()
    audioAnalyser.fftSize = 512
    audioArray.value = new Uint8Array(audioAnalyser.frequencyBinCount)
    source.connect(audioAnalyser)
    audioAnalyser.connect(audCtx.destination)

    isInit = true
    draw()
  }
  audio.onended = () => {
    state.value = false
  }
}

onMounted(() => {
  init(audioRef.value)
})
</script>
<template>
  <div class="audioDraw flex-box">
    <div class="box">
      <canvas ref="canvasRef" id="canvas"></canvas>
      <div class="operation">
        <a-upload
          name="file"
          :file-list="fileList"
          accept=".mp3"
          :before-upload="beforeUpload"
          :showUploadList="false"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            选择文件
          </a-button>
        </a-upload>
        <span style="margin-left: 0.5rem">{{
          fileList.length === 0 ? '默认音频（自己唱的，没版权风险）' : fileList[0].name
        }}</span>
        <a-button
          class="play"
          shape="circle"
          v-show="!state"
          :icon="h(CaretRightOutlined)"
          @click="play"
        ></a-button
        ><a-button
          class="play"
          shape="circle"
          v-show="state"
          :icon="h(PauseOutlined)"
          @click="pause"
        ></a-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.audioDraw {
  .box {
    width: 36rem;
    height: 20rem;
    canvas {
      width: 100%;
      height: 18rem;
      border: 0.1rem solid rgba(89, 118, 186, 0.5);
      border-radius: 1rem;
    }
    .operation {
      display: flex;
      justify-content: center;
      align-items: center;
      .play {
        margin-left: auto;
      }
    }
  }
}
</style>
