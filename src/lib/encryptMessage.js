export async function encryptMessage (publicKey, encodedMessage) {
  return window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    publicKey,
    encodedMessage
  )
}
