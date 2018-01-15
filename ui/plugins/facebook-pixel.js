export default ({ app }) => {
  if (process.env.NODE_ENV !== 'production') return false
  ((f, b, e, v, n, t, s) => {
    if (f.fbq) return false
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  // window.fbq('init', '1691931001077188') // 安裝 Facebook Pixel

  app.router.afterEach((to, from) => {
    // window.fbq('track', 'PageView') // 送出 Facebook Pixel PageView
    // window.fbq('trackCustom', 'YearEnd_01_CS_PV') // 送出 Facebook Pixel 事件
  })
}
