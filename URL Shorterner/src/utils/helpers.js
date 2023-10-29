export function randomString (length = 6) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let hash = ''
  for (let i = 0; i < length; i++) {
    hash += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  }

  return hash
}
