type $Fetch = typeof $fetch

type requestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

class HttpFactory {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  protected async call<T>(
    url: string,
    method: requestMethod,
    data?: object,
    extras = {}
  ): Promise<T> {
    const res: T = await this.$fetch(url, { method, body: data, ...extras })
    return res
  }
}

export default HttpFactory
