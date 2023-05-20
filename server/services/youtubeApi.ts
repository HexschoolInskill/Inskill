// eslint-disable-next-line
// refresh token function
// create youtube stream function
// end youtube stream function
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

let ACCESS_TOKEN = "ya29.a0AWY7CklY3isjoB22FKx0Z4NI1RgMzgAnYBssuuv-5M7ETEmFF9kpzSfemUvbesqHNYzXsA70FJ02_BpztrugdCagosM-m1zkFQ6_3lM32UgwQ-whwQVfGsdN3DJ2mVa4HYg6TOQWJTeEBW2QgqOjFBtH0AzxGvIaCgYKAe8SARASFQG1tDrp-rVpXdwAX56xh1hMaZdFYQ0166"
let ACCESS_TOKEN_EXPIRE = 1684585793809
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
async function refreshToken() {
    // refresh token function
    try {
        if(Date.now() + 60*1000 >= ACCESS_TOKEN_EXPIRE) { 
            const endpoint = `https://oauth2.googleapis.com/token`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&refresh_token=${REFRESH_TOKEN}&grant_type=refresh_token`
            }
            const response = await fetch(endpoint, options)
            const { status, statusText } = response
            console.log(`refreshToken status-statusText:`,status, statusText)
            const data = await response.json()
            if(status === 400) throw data
            // console.log(`refreshTokenResponse : `,data)
            ACCESS_TOKEN = data.access_token
            ACCESS_TOKEN_EXPIRE = Date.now() + data.expires_in * 1000
        }
        return {
            success : true,
            data : ''
        }
    } catch (err) {
        console.log(`refreshToken error: `, err)
        return {
            success : false,
            message : err || `refreshToken error`
        }
    }
}

async function createLiveBroadcast(title: string = `Live Stream ${Date.now()}`, description: string = `Live Stream ${Date.now()}`, scheduledStartTime: string = new Date().toISOString()) {
    // create youtube stream function
    try {
        const endpoint = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                "snippet": {
                    "title": title,
                    "description": description,
                    "scheduledStartTime" : scheduledStartTime
                },
                "status": {
                    "privacyStatus": "private",
                    "selfDeclaredMadeForKids": false
                },
            })
        }
        const response = await fetch(endpoint, options)
        const { status, statusText } = response
        console.log(`createLiveBroadcast status-statusText:`,status, statusText)
        const data = await response.json()
        // console.log(`createLiveBroadcastResponse : `,data)
        if(status === 400) throw data
        return {
            success : true,
            data : data
        }
    } catch(err) {
        console.log(`createLiveBroadcast error: `, err)
        throw {
            success : false,
            message : err || `createLiveBroadcast error`
        }
    }
}

async function createStream(title : string, resolution : string = '1080p') {
    try {
        const liveStreamResponse = await fetch('https://www.googleapis.com/youtube/v3/liveStreams?part=snippet,cdn', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    snippet: {
                        title
                    },
                    cdn: {
                        resolution,
                        frameRate : '60fps',
                        ingestionType: 'rtmp',
                        ingestionInfo: {
                            streamName: 'ultra_low_latency',
                        },
                    },
                })
            })
            const { status, statusText } = liveStreamResponse
            console.log(`createStream status-statusText:`,status, statusText)
            const data = await liveStreamResponse.json()
            // console.log(`createStreamResponse : `,data)
            if(status === 400) throw data
            return {
                success : true,
                data
            }
    } catch(err) {
        console.log(`createStream error: `, err)
        throw {
            success : false,
            message : err || `createStream error`
        }
    }
}

async function bindBroadcast2Stream(liveBroadcastId : string, liveStreamId : string) {
    try {
        const bindResponse = await fetch(`https://www.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${liveBroadcastId}&streamId=${liveStreamId}&part=id,contentDetails`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const { status, statusText } = bindResponse
        console.log(`bindBroadcast2Stream status-statusText:`,status, statusText)
        const data = await bindResponse.json()
        // console.log(`bindBroadcast2StreamResponse : `,data)
        if(status === 400) throw data
        return {
            success : true,
            data
        }
    } catch(err) {
        console.log(`bindBroadcast2Stream error: `, err)
        throw {
            success : false,
            message : err || `bindBroadcast2Stream error`
        }
    }
}


export async function createLive() {
    try {
        const {success : refreshTokenSuccess} = await refreshToken()
        if(!refreshTokenSuccess) throw new Error(`refreshToken failed`)

        const {data : broadcastsData} = await createLiveBroadcast()
        const {data : streamData} = await createStream(broadcastsData.snippet.title)
        const {data : bindData} = await bindBroadcast2Stream(broadcastsData.id, streamData.id)
        return {
            success : true,
            data : {
                broadcastId : broadcastsData.id,
                streamId : streamData.id,
                streamKey : streamData.cdn.ingestionInfo.streamName
            }
        }
    } catch (err) {
        console.log(`createLive error: `, err)
        return {
            success : false,
            message : err || `createLive error`
        }
    }
}

async function getLiveBroadcast(broadcastId : string) { 
    try {
        const liveBroadcastResponse = await fetch(`https://www.googleapis.com/youtube/v3/liveBroadcasts?part=status&id=${broadcastId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Accept': 'application/json',
            },
        })
        const { status, statusText } = liveBroadcastResponse
        console.log(`getLiveBroadcast status-statusText:`,status, statusText)
        const data = await liveBroadcastResponse.json()
        console.log(`getLiveBroadcastResponse : `,data)
        if(status === 400) throw data
        const streamStatus = data.items[0].status
        console.log(`streamStatus : `,streamStatus)
        return {
            success : true,
            data : streamStatus
        }
    } catch(err) {
        console.log(`getLiveBroadcast error: `, err)
        throw {
            success : false,
            message : err || `getLiveBroadcast error`
        }
    }
}

async function updateBroadcastStatus(broadcastId : string, broadcastStatus : string) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/liveBroadcasts/transition?part=status&id=${broadcastId}&broadcastStatus=${broadcastStatus}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const { status, statusText } = response
        console.log(`updateBroadcastStatus status-statusText:`,status, statusText)
        const data = await response.json()
        console.log(`updateBroadcastStatusResponse : `,data)
        if(status === 400) throw data
        return {
            success : true,
            data
        }
    } catch(err) {
        console.log(`updateBroadcastStatus error: `, err)
        throw {
            success : false,
            message : err || `updateBroadcastStatus error`
        }
    }
}

export async function startLive(broadcastId : string) {
    // update stream status to live
    try {
        const {success : refreshTokenSuccess} = await refreshToken()
        if(!refreshTokenSuccess) throw new Error(`refreshToken failed`)
        const {data : streamStatus} = await getLiveBroadcast(broadcastId)
        if(streamStatus.lifeCycleStatus === 'complete') throw `stream already ended`
        if(streamStatus.lifeCycleStatus === 'live') throw `stream already started`

        const data = await updateBroadcastStatus(broadcastId, 'live')
        return {
            success : true,
            data
        }
    } catch(err) {
        console.log(`startLive error: `, err)
        return {
            success : false,
            message : err || `startLive error`
        }
    }
}
export async function endLive(broadcastId : string) {
    // update stream status to complete
    try {
        const {success : refreshTokenSuccess} = await refreshToken()
        if(!refreshTokenSuccess) throw new Error(`refreshToken failed`)
        const {data : streamStatus} = await getLiveBroadcast(broadcastId)
        if(streamStatus.lifeCycleStatus === 'complete') throw `stream already ended`
        if(streamStatus.lifeCycleStatus === 'ready') throw `stream not started yet`

        const data = await updateBroadcastStatus(broadcastId, 'complete')
        return {
            success : true,
            data
        }
    } catch(err) {
        console.log(`endStream error: `, err)
        return {
            success : false,
            message : err || `endStream error`
        }
    }
}