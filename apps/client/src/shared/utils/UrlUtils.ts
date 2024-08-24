export class UrlUtils {
  static encodeUrlById(id: string) {
    const firstUrl = btoa(id)
    const secondUrl = btoa(firstUrl)
    return encodeURIComponent(secondUrl)
  }

  static decodeUrlById(encodedUrl: string) {
    const firstUrl = decodeURIComponent(encodedUrl)
    const secondUrl = atob(firstUrl)
    return atob(secondUrl)
  }
}
