<script setup lang="ts" name="webcam">
import { onMounted, ref } from 'vue'

interface iDevice {
  deviceId: string
  groupId: string
  kind: string
  label: string
}

const videoRef = ref<HTMLVideoElement>()
const selectRef = ref()
const videoDevices = ref<iDevice[]>([])
const audioDevices = ref<iDevice[]>([])
const activeVideo = ref<iDevice>()
const activeAudio = ref<iDevice>()
const running = ref<boolean>(false)

// 全局作用域视频流
let saveStream: MediaStream

// 触发浏览器权限确认气泡
const tryCam = () => {
  navigator.mediaDevices.getUserMedia({ audio: true, video: true })
}

// 开始接收传输视频流
const openCam = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId: activeAudio.value?.deviceId,
        groupId: activeAudio.value?.groupId
      },
      video: {
        width: 1600,
        height: 900,
        deviceId: activeVideo.value?.deviceId,
        groupId: activeVideo.value?.groupId
      }
    })
    .then((stream) => {
      let video = videoRef.value
      if (video) {
        video.srcObject = stream
        video.onloadedmetadata = () => video.play()
        saveStream = stream
        running.value = true
      }
    })
}

// 关闭视频流
const closeCam = () => {
  saveStream.getTracks().forEach((track) => track.stop())
  running.value = false
}

// 获取设备列表
const getDevices = () => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    let ds = devices
      .filter((d) => d.kind === 'videoinput')
      .map((d) => {
        const deviceObj = d.toJSON()
        const { deviceId, groupId, kind, label } = deviceObj
        return { deviceId, groupId, kind, label }
      })
    videoDevices.value = ds
    activeVideo.value = ds[0]

    ds = devices
      .filter((d) => d.kind === 'audioinput')
      .map((d) => {
        const deviceObj = d.toJSON()
        const { deviceId, groupId, kind, label } = deviceObj
        return { deviceId, groupId, kind, label }
      })
    audioDevices.value = ds
    activeAudio.value = ds[0]
  })
}

// 切换音视频设备
const handleChange = (key: string, value: string) => {
  if (key === 'audio') {
    activeAudio.value = audioDevices.value.filter((d) => d.deviceId === value)[0]
  } else {
    activeVideo.value = videoDevices.value.filter((d) => d.deviceId === value)[0]
  }
}

onMounted(() => {
  tryCam()
})
</script>
<template>
  <div class="webcam flex-box">
    <div class="box">
      <video ref="videoRef" id="video" autoplay></video>
      <div id="operation">
        <div class="device">
          <div class="video">
            <span>视频设备选择</span>
            <a-select
              class="select"
              ref="selectRef"
              :value="activeVideo"
              @change="
                (value: string) => {
                  handleChange('video', value)
                }
              "
            >
              <a-select-option
                v-for="device in videoDevices"
                :key="device.deviceId"
                :value="device.deviceId"
                >{{ device.label }}</a-select-option
              >
            </a-select>
          </div>

          <div class="video">
            <span>音频设备选择</span>
            <a-select
              class="select"
              ref="selectRef"
              :value="activeAudio"
              @change="
                (value: string) => {
                  handleChange('audio', value)
                }
              "
            >
              <a-select-option
                v-for="device in audioDevices"
                :key="device.deviceId"
                :value="device.deviceId"
                >{{ device.label }}</a-select-option
              >
            </a-select>
          </div>
        </div>
        <a-button class="button" @click="getDevices">刷新设备</a-button>
        <a-button
          class="button"
          @click="
            () => {
              running ? closeCam() : openCam()
            }
          "
          >{{ running ? '结束' : '开始' }}</a-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.webcam {
  .box {
    display: flex;
    width: 32rem;
    height: 20rem;
    flex-direction: column;
    #video {
      width: 32rem;
      height: 18rem;
      border: 1px solid #68cad4;
    }
    #operation {
      display: flex;
      flex: 1;
      align-items: center;
      .select {
        width: 15rem;
      }
      .button {
        height: 100%;
        margin-left: auto;
      }
    }
  }
}
</style>
