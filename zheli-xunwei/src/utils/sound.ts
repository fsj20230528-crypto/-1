let audioCtx: AudioContext | null = null

export function playDing() {
  try {
    if (!audioCtx) audioCtx = new AudioContext()
    const ctx = audioCtx

    // Web Audio 合成“叮”音：短促高频 + 快速衰减包络，无需外部音频文件
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1100, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.32, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.24)
  } catch {
    return
  }
}
