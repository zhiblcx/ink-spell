export default function startCountdown(initialCount: number, callback: React.Dispatch<React.SetStateAction<string>>) {
  let countdown = initialCount
  callback(countdown + '秒后重试') // 初始状态
  const timer = setInterval(() => {
    countdown--
    if (countdown >= 0) {
      callback(countdown + '秒后重试')
    } else {
      clearInterval(timer)
      callback('发送')
    }
  }, 1000)
}
