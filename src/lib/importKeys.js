export async function importPublicFromJwk (keyData) {
  return window.crypto.subtle.importKey(
    'jwk',
    keyData,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256'
    },
    true,
    ['encrypt']
  )
}

export async function importPrivateFromJwk (keyData) {
  return window.crypto.subtle.importKey(
    'jwk',
    keyData,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256'
    },
    true,
    ['decrypt']
  )
}
