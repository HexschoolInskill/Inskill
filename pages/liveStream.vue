<template>
  <div class="liveStreamContainer">
    <div class="videoZone">
      <!-- <video ref="videoElementCamera" autoplay playsinline controls></video> -->
      <video id="videoElementScreen" ref="videoElementScreen" autoplay playsinline></video>
    </div>
    <!-- <div class="soucreControllZone">
      <div class="cameraZone">
        <div class="title">Choose camera soucre</div>
        <select v-model="selectedCameraDevice" @change="changeDevice">
          <option 
            v-for="device in videoDevices" 
            :key="device.deviceId" 
            :value="device.deviceId"
          >

            {{ device.label }}
          </option>
        </select>
      </div>
      <div class="screenAudioZone">
        <div class="title">Choose Audio soucre</div>
        <select v-model="selectedAudioDevice" @change="changeAudioDevice">
          <option 
            v-for="device in audioDevices" 
            :key="device.deviceId" 
            :value="device.deviceId"
          >

            {{ device.label }}
          </option>
        </select>
      </div>
      <div class="screenVideoZone">
        <div class="title" @click="initScreenVideo">Choose screen soucre</div>
      </div>
      
    </div> -->
    <div class="buttonGroup">
      <div class="publish" @click="publish">Publish</div>
      <div class="stopPublish" @click="unPublish">Stop Publish</div>
      <div class="" @click="shareScreen">shareScreen</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {WebRTCAdaptor} from '../plugins/webRtcApp'
const videoDevices = ref([])
const audioDevices = ref([])
const selectedCameraDevice = ref(null)
const selectedScreenDevice = ref(null)
const selectedAudioDevice = ref(null)
const videoElementCamera = ref(null)
const videoElementScreen = ref(null)
const streamId = "sUp52I0Y7hxf1685403431483"

let streamNode = ref(null)


onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  videoDevices.value = devices.filter(device => device.kind === 'videoinput')
  audioDevices.value = devices.filter(device => device.kind === 'audioinput')
  // await initCameraVideo()
  await initWebRTC()
})

const initCameraVideo = async () => {
  if (videoDevices.value.length > 0) {
    selectedCameraDevice.value = videoDevices.value[0].deviceId
    const constraints = {
      video: {
        deviceId: selectedCameraDevice.value ? { exact: selectedCameraDevice.value } : undefined
      },
      // audio : true
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    videoElementCamera.value.srcObject = stream
  }
}

const initScreenAudio = async () => {
  if (audioDevices.value.length > 0) {
    selectedAudioDevice.value = audioDevices.value[0].deviceId 
  }
}

const initScreenVideo = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
  selectedScreenDevice.value = stream
  videoElementScreen.value.srcObject = stream
}

const changeAudioDevice = async () => {
  selectedAudioDevice.value = selectedAudioDevice.value[0].deviceId
  const constraints = {
    video : {
      deviceId: selectedScreenDevice.value ? { exact: selectedScreenDevice.value.id } : undefined
    },
    audio: {
      deviceId: selectedAudioDevice.value ? { exact: selectedAudioDevice.value } : undefined
    }
  }
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  videoElementScreen.value.srcObject = stream
}

const initWebRTC = async () => {
  // connect to rtmp media server https://inskillmedia.demoto.me:5443/webRtcApp

  streamNode = new WebRTCAdaptor({
      websocket_url: "wss://inskillmedia.demoto.me:5443/WebRTCApp/websocket?target=origin",
      // websocket_url: "ws://localhost:931",
      mediaConstraints: {
          video: true,
          audio: true,
      },
      peerconnection_config: {
          'iceServers': [{'urls': 'stun:stun1.l.google.com:19302'}]
      },
      sdp_constraints: {
          OfferToReceiveAudio : false,
          OfferToReceiveVideo : false,
      },
      localVideoId: "videoElementScreen", // <video id="id-of-video-element" autoplay muted></video>
      bandwidth: 900, // default is 900 kbps, string can be 'unlimited'
      dataChannelEnabled: false, // enable or disable data channel
      callback: (info, obj) => {
        console.log(obj)
        if (info == "publish_started") {
          console.info("publish started");
        } else if (info == "publish_finished") {
          console.info("publish finished");
        }
        else {
          console.log( info + " notification received");
        }
      },
      callbackError : function(error, message) {
        console.info("error callback: " +  JSON.stringify(error));
      }
  })
  
}

const publish = async () => {
  const status = streamNode.iceConnectionState(streamId)
  console.log(`publish status`, status)
  streamNode.publish(streamId)
}

const unPublish = async () => {
  console.log(`stop`)
  streamNode.stop(streamId)
}

const shareScreen = async () => {
  streamNode.switchDesktopCapture(streamId)
  // streamNode.switchVideoCapture(streamId)
}

</script>


<style lang="sass">
.liveStreamContainer
  background-color: #fff
  height: 100%
  max-height: 80vh
  margin-top: 16px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  .videoZone
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    gap : 16px
    video
      width: 50%
      height: 50%
  .soucreControllZone
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    gap : 16px
    .title
      display: flex
      align-items: center
      justify-content: center
</style>