const API_ENDPOINT = process.env.MEDIA_SERVER_ENDPOINT
export async function getWebRTCAppList(): Promise<any> {
  // 獲取媒體伺服器的webRTCApp list
  try {
    const APIURI = `${API_ENDPOINT}/broadcasts/list/0/100`
    const response = await fetch(APIURI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { status, statusText } = response
    console.log(`getWebRTCAppList status-statusText:`, status, statusText)
    const data = await response.json()
    return {
      success: true,
      data
    }
  } catch (err) {
    console.log(`getWebRTCAppList error: `, err)
    return {
      success: false,
      message: err || `getWebRTCAppList error`
    }
  }
}

export async function updateWebRTCAppEndPointList(
  webRTCAppId: string,
  rtmpUrl: string
): Promise<any> {
  // 更新媒體伺服器的webRTCApp 某個 stream 的 endPointList
  try {
    const APIURI = `${API_ENDPOINT}/broadcasts/${webRTCAppId}`
    const response = await fetch(APIURI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        endPointList: [
          {
            status: 'created',
            type: 'rtmp',
            rtmpUrl,
            endpointServiceId: 'null'
          }
        ]
      })
    })
    const { status, statusText } = response
    console.log(`updateWebRTCAppEndPointList status-statusText:`, status, statusText)
    const data = await response.json()
    const { success, message } = data
    if (!success) throw new Error(message)
    return {
      success: true,
      data: ''
    }
  } catch (err) {
    console.log(`updateWebRTCAppEndPointList error: `, err)
    return {
      success: false,
      message: err || `updateWebRTCAppEndPointList error`
    }
  }
}

export async function getWebRTCAppRecordList(): Promise<any> {
  // 獲取媒體伺服器的webRTCApp 直播錄影列表
  try {
    const APIURI = `${API_ENDPOINT}/vods/list/0/100`
    const response = await fetch(APIURI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { status, statusText } = response
    console.log(`getWebRTCAppRecordList status-statusText:`, status, statusText)
    const data = await response.json()
    return {
      success: true,
      data
    }
  } catch (err) {
    console.log(`getWebRTCAppRecordList error: `, err)
    return {
      success: false,
      message: err || `getWebRTCAppRecordList error`
    }
  }
}

export async function createWebRTCApp(roomName: string): Promise<any> {
  // 創建媒體伺服器的webRTCApp
  try {
    const APIURI = `${API_ENDPOINT}/broadcasts/create`
    const response = await fetch(APIURI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: roomName
      })
    })
    const { status, statusText } = response
    // console.log(`createWebRTCApp status-statusText:`, status, statusText)
    const data = await response.json()
    // console.log(`createWebRTCApp data:`, data)
    return {
      success: true,
      data
    }
  } catch (err) {
    console.log(`createWebRTCApp error: `, err)
    return {
      success: false,
      message: err || `createWebRTCApp error`
    }
  }
}
