import { Nitro } from 'nitropack'
import { WebSocketServer } from 'ws'
/**
 * Needed packages:
 * @types/ws
 * ws
 *
 * Command :
 * npm i -s @types/ws ws
 */
const WSS = new WebSocketServer({ port: 931 })
export default (_nitroApp: Nitro) => {
  console.log(`---------- initSocket start @ ${new Date().toLocaleDateString()}--------\n\n`)
  try {
    WSS.on('connection', function connection(ws: any) {
      console.log(`Connected to socket @${new Date().toLocaleDateString()}`)

      ws.on('message', function incoming(message: string) {
        const updates = JSON.parse(message)
        console.log('updates: ', updates)
      })

      ws.on('close', function close() {
        console.log(`Disconnected from socket @${new Date().toLocaleDateString()}`)
      })
    })
  } catch (err) {
    console.log(`--------------------------------`)
    console.log(`initSocket error :`, err)
    console.log(`--------------------------------`)
  }
}
