import type { $Fetch } from 'ofetch'

type requestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

class HttpFactory {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  protected async call<T>(
    url: string,
    method: requestMethods,
    data?: object,
    extras = {}
  ): Promise<T> {
    const res: T = await this.$fetch(url, { method, body: data, ...extras })
    return res
  }
}

export default HttpFactory
