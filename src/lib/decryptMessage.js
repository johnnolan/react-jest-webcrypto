export async function decryptMessage (publicKey, ciphertext) {
  return window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP'
    },
    publicKey,
    ciphertext
  )
}
