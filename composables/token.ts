const setToken = (token: string) => {
    const accessToken = useCookie('access_token',{
        maxAge: 604800 // 7 days
      })
      accessToken.value = token
}

const deleteToken = () => {
    const accessToken = useCookie('access_token')
    accessToken.value = null
}

const useToken = () => {
    const accessToken = useCookie('access_token')
    return accessToken.value
}

export default {
    setToken,
    deleteToken,
    useToken
}