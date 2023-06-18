// @ts-nocheck
type $Fetch = typeof $fetch

type requestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

class HttpFactory {
  protected $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  protected async call<T>(
    url: string,
    method: requestMethod,
    data?: object | null,
    extras = {}
  ): Promise<T> {
    try {
      return await this.$fetch(url, { method, body: data, ...extras })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default HttpFactory
