<template>
  <div class="liveStreamContainer">
    <div class="videoZone">
      <video id="webRtcPlayer" autoplay playsinline controls></video>
    </div>
    <div class="buttonGroup">
      <div class="" @click="joinRoom">joinRoom</div>
      <div class="" @click="leaveRoom">leaveRoom</div>
    </div>

    <iframe width="560" height="315" :src="`https://inskillmedia.demoto.me:5443/WebRTCApp/play.html?name=${streamId}`" frameborder="0" allowfullscreen></iframe>
    <!-- chat screen -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import {WebRTCAdaptor} from '../plugins/webRtcApp'
let streamNode = ref(null)
const streamId = "sUp52I0Y7hxf1685403431483"


onMounted(async () => {
  // await initWebRTC()

})


// const initWebRTC = async () => {
//   streamNode = new WebRTCAdaptor({
//       websocket_url: "wss://inskillmedia.demoto.me:5443/WebRTCApp/websocket",
//       mediaConstraints: {
//           video: false,
//           audio: false,
//       },
//       peerconnection_config: {
//           'iceServers': [{'urls': 'stun:stun1.l.google.com:19302'}]
//       },
//       sdp_constraints: {
//           OfferToReceiveAudio : true,
//           OfferToReceiveVideo : true,
//       },
//       remoteVideoId : "webRtcPlayer", 
//       isPlayMode : true,
//       // debug : true,
//       callback: (info, obj) => {
//         if (info == "play_started") {
//           alert("play started");
//         } else if (info == "play_finished") {
//           alert("play finished");
//         }
//         else {
//           console.log( info + " notification received");
//         }
//       },
//       callbackError : function(error, message) {
//         alert("error callback: " +  JSON.stringify(error));
//       }

//   })
// }


// const joinRoom = async () => {
//   streamNode.play(streamId)
// }
// const leaveRoom = async () => {
//   streamNode.stop(streamId)
// }

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