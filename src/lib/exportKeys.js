async function exportKey (keyData) {
  return window.crypto.subtle.exportKey('jwk', keyData)
    .then((key) => {
      return (key)
    })
}

export async function exportjwkPublicKey (key) {
  return exportKey(key.publicKey)
}

export async function exportjwkPrivateKey (key) {
  return exportKey(key.privateKey)
}
