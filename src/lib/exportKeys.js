async function exportKey (keyData) {
  return window.crypto.subtle.exportKey('jwk', keyData)
    .then((key) => {
      return (key)
    })
}

export async function exportJwtPublicKey (key) {
  return exportKey(key.publicKey)
}

export async function exportJwtPrivateKey (key) {
  return exportKey(key.privateKey)
}
