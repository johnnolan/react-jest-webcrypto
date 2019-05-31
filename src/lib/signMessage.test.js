import { generateKey } from './rootRSAOAEPKey'
import { exportJwtPublicKey } from './exportKeys'
import { importPublicFromJwk } from './importKeys'
import { encryptMessage } from './encryptMessage'
import { signMessage } from './signMessage'
import encoding from 'text-encoding'
window.TextEncoder = encoding.TextEncoder
window.TextDecoder = encoding.TextDecoder
window.atob = require('atob')
var WebCrypto = require('node-webcrypto-ossl')
window.crypto = new WebCrypto()

describe('Given I try to Encrypt a new message', () => {
  let generatedKey
  let publicJwtToken
  let publicKey

  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
        return exportJwtPublicKey(generatedKey)
          .then((key) => {
            publicJwtToken = key
            return importPublicFromJwk(publicJwtToken)
              .then((key) => {
                publicKey = key
              })
          })
      })
  })

  describe('And it is a alpha numeric string value', () => {
    let message = new TextEncoder().encode('Hello World 12345')
    let encryptedMessage
    beforeAll(() => {
      return encryptMessage(publicKey, message)
        .then((value) => {
          encryptedMessage = value
        })
    })

    it('it should not be null', () => {
      expect(encryptedMessage).not.toBeNull()
    })

    it('it should be of type ArrayBuffer', () => {
      expect(encryptedMessage.constructor).toBe(ArrayBuffer)
    })
  })
})
