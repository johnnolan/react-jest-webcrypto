// Generate our root Public Key for all encryption from now on
export async function generateKey () {
  return window.crypto.subtle.generateKey({
    name: 'RSA-OAEP',
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: {
      name: 'SHA-256'
    }
  },
  true,
  ['encrypt', 'decrypt']
  )
}
