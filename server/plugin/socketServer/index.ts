import { Nitro } from 'nitropack'
import { WebSocketServer } from 'ws'
import CryptoJS from 'crypto-js'
import Joi from 'joi'
import models from '../../model/schema'
/**
 * Needed packages:
 * @types/ws
 * ws
 *
 * Command :
 * npm i -s @types/ws ws
 */
const subscriberList: any = []
const WSS = new WebSocketServer({ port: 931 })
export default (_nitroApp: Nitro) => {
  console.log(`---------- initSocket start @ ${new Date().toLocaleDateString()}--------\n\n`)
  try {
    WSS.on('connection', async function connection(ws: any, req: any) {
      let subscriberIndex: number = -1
      let connectionInterval: any = null
      console.log(`Connected to socket @${new Date().toLocaleDateString()}`)

      // check whether listenkey is valid
      console.log(`Connected from : `, req.url)
      const listenkey = req.url.slice(1)
      console.log(`listenkey : `, listenkey)
      const { timestamp, expire, courseId, userId } = await decryptListenKey(listenkey)
      if (!timestamp || !expire || !courseId || !userId) {
        // send error listenkey message
        ws.send(
          JSON.stringify({
            success: false,
            error: 'listenkey is not valid'
          })
        )
        ws.close()
        return
      }

      // fetch user name
      const userInfo = await models.User.findById(userId)
      if (!userInfo) {
        // send error listenkey message
        ws.send(
          JSON.stringify({
            success: false,
            error: 'user does not exist'
          })
        )
        ws.close()
        return
      }
      const { username, purchasedCourses } = userInfo
      const purchasedCourse = purchasedCourses.find((e: any) => e.courseId == courseId)
      const isTeacher = await models.LiveCourse.findOne({
        _id: courseId,
        teacherId: userId
      })
      if (!purchasedCourse && !isTeacher) {
        // send error listenkey message
        ws.send(
          JSON.stringify({
            success: false,
            error: 'course does not exist'
          })
        )
        ws.close()
        return
      }

      const socketKey = req.headers['sec-websocket-key']
      const ip = req.socket.remoteAddress || req.headers.host
      console.log({
        listenkey,
        socketKey,
        ip
      })

      // if(!subscriberList.find((e : any)=> e.listenkey === listenkey )) { // production : && e.socketKey === socketKey && e.ip === ip
      if (
        !subscriberList.find((e: any) => e.listenkey === listenkey && e.socketKey === socketKey)
      ) {
        // dev && e.ip === ip
        subscriberList.push({
          socketKey,
          ip,
          listenkey,
          connectedAt: Date.now(),
          socket: ws,
          lastestUpdate: 0,
          expired: 0, //60 * 60 * 1000
          ping: 0 //用來 測試是否還有連線狀態, 記錄ping回去的時間
        })
        subscriberIndex = subscriberList.length - 1
      }

      // check connection every 5 minutes
      // connectionInterval = setInterval(() => {
      //     const noTalkTime = 5 * 60 * 1000
      //     const subscriber = subscriberList[subscriberIndex]
      //     const {lastestUpdate, ping} = subscriber
      //     if(ping > 0) { // 有 ping 過去
      //         if(Date.now() - ping > noTalkTime) { // 沒有收到 pong 回來
      //             ws.close()
      //         }
      //     } else { // 沒有 ping 過去
      //         if(lastestUpdate === 0 || (lastestUpdate > 0 && Date.now() - lastestUpdate > noTalkTime)) { // 超過 1分鐘沒有更新
      //             const ts = Date.now()
      //             const ping = {
      //                 "ping": ts
      //             }
      //             ws.send(JSON.stringify(ping))
      //             subscriberList[subscriberIndex].ping = ts
      //         }
      //     }
      // }, 5 * 60 * 1000)

      ws.on('message', function incoming(message: string) {
        const updates = JSON.parse(message)
        console.log('updates: ', updates)

        // checkout send message structure
        const parametersSchema = Joi.object({
          pong: Joi.date().timestamp('javascript').empty(),
          text: Joi.string()
        }).without('pong', ['text'])
        const { error, value } = parametersSchema.validate(updates, { abortEarly: true })
        if (error) {
          console.log(`Params error : `, error)
          ws.send(`Params error`)
          ws.close()
        }
        const { text, pong } = value
        console.log({ text, pong })
        if (pong) {
          subscriberList[subscriberIndex].ping = Date.now()
          console.log(subscriberList[subscriberIndex])
        }

        // if text is not empty, send to all other subscribers
        if (text) {
          subscriberList.forEach((e: any, i: number) => {
            if (i !== subscriberIndex) {
              e.socket.send(
                JSON.stringify({
                  userId,
                  username,
                  text,
                  viewerCount: subscriberList.length
                })
              )
            }
          })
        }
      })

      ws.on('close', function close() {
        console.log(`Disconnected from socket @${new Date().toLocaleDateString()}`)
        const unsubscriberIndex = subscriberList.findIndex((e: any) => e.listenkey === listenkey)
        if (unsubscriberIndex > -1) subscriberList.splice(unsubscriberIndex, 1)
        // clear interval
        // clearInterval(connectionInterval)
        // console.log({
        //     subscriberList,
        //     connectionInterval,
        //     subscriberIndex
        // })
      })
    })
  } catch (err) {
    console.log(`--------------------------------`)
    console.log(`initSocket error :`, err)
    console.log(`--------------------------------`)
  }
}

async function decryptListenKey(encrypt: string) {
  try {
    const decryptListenkey = CryptoJS.AES.decrypt(encrypt, 'socketKey', {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
    console.log({ decryptListenkey })
    return !decryptListenkey
      ? {
          timestamp: 0,
          expire: 0,
          courseId: '',
          userId: ''
        }
      : JSON.parse(decryptListenkey)
  } catch (error) {
    console.log(`--------------------------------`)
    console.log(`decryptListenKey error :`, error)
    console.log(`--------------------------------`)
    return {
      timestamp: 0,
      expire: 0,
      courseId: '',
      userId: ''
    }
  }
}
