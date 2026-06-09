export function digitsOnly(input: string) {
  return input.replace(/\D/g, '')
}

export function formatPhone344(digits: string) {
  const d = digitsOnly(digits).slice(0, 11)
  const p1 = d.slice(0, 3)
  const p2 = d.slice(3, 7)
  const p3 = d.slice(7, 11)
  if (!p2) return p1
  if (!p3) return `${p1}-${p2}`
  return `${p1}-${p2}-${p3}`
}

export function isValidCNPhone(digits: string) {
  const d = digitsOnly(digits)
  return /^1\d{10}$/.test(d)
}

export function isValidCode6(digits: string) {
  return /^\d{6}$/.test(digitsOnly(digits))
}

export function maskPhone(digits: string) {
  const d = digitsOnly(digits)
  if (d.length !== 11) return d
  return `${d.slice(0, 3)}****${d.slice(7)}`
}
