const _setInterval = (fn: () => void, a: number, b: number): number => {
  let timeout: number = 0
  let interval: number = a
  const handler = (): void => {
    timeout = setTimeout(() => {
      fn && fn()
      handler()
      interval += b
      console.log(interval)
    }, interval)
  }
  return timeout
}

const _clearInterval = (timeout: number): void => clearTimeout(timeout)

const timeout = _setInterval(() => {}, 3000, 2000)
setTimeout(() => _clearInterval(timeout), 10000)
