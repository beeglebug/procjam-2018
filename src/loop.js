import Time from './Time'

export default function loop (fn) {
  const step = time => {
    requestAnimationFrame(step)
    Time.update(time)
    fn(Time.deltaTime)
  }
  step()
}
