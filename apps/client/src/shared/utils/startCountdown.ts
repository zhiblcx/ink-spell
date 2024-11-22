import i18next from 'i18next'

export function startCountdown(initialCount: number, callback: React.Dispatch<React.SetStateAction<string>>) {
  let countdown = initialCount
  callback(i18next.t('PROMPT:retry_in_seconds', { seconds: countdown })) // 初始状态
  const timer = setInterval(() => {
    countdown--
    if (countdown >= 0) {
      callback(i18next.t('PROMPT:retry_in_seconds', { seconds: countdown }))
    } else {
      clearInterval(timer)
      callback(i18next.t('COMMON:send'))
    }
  }, 1000)
}
