type $Fetch = typeof $fetch

type requestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

class HttpFactory {
  protected $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  protected async call<T extends IResponse>(
    url: string,
    method: requestMethod,
    data?: object,
    extras = {}
  ): Promise<T> {
    const res = (await this.$fetch(url, { method, body: data, ...extras })) as T

    if (!res.success) return Promise.reject(res)

    return res
  }
}

export default HttpFactory
