import { generateKey } from './rootRSAOAEPKey'
import { exportJwtPublicKey, exportJwtPrivateKey } from './exportKeys'
import { importPublicFromJwk, importPrivateFromJwk } from './importKeys'
import { encryptMessage } from './encryptMessage'
import { decryptMessage } from './decryptMessage'
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
  let privateJwtToken
  let privateKey

  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
        return exportJwtPublicKey(generatedKey)
          .then((key) => {
            publicJwtToken = key
            return exportJwtPrivateKey(generatedKey)
              .then((key) => {
                privateJwtToken = key
                return importPublicFromJwk(publicJwtToken)
                  .then((key) => {
                    publicKey = key
                    return importPrivateFromJwk(privateJwtToken)
                      .then((key) => {
                        privateKey = key
                      })
                  })
              })
          })
      })
  })

  describe('And it is a alpha numeric string value', () => {
    const messageToEncode = 'Hello World 12345'
    let message = new TextEncoder().encode(messageToEncode)
    let encryptedMessage
    let decryptedMessage
    beforeAll(() => {
      return encryptMessage(publicKey, message)
        .then((value) => {
          encryptedMessage = value
          return decryptMessage(privateKey, encryptedMessage)
            .then((decryptedValue) => {
              decryptedMessage = new TextDecoder().decode(decryptedValue)
            })
        })
    })

    it('it should match orignal string', () => {
      expect(decryptedMessage).toBe(messageToEncode)
    })
  })

  describe('And it is a complex object', () => {
    const messageToEncode = {
      hello: 'World!',
      working: true
    }
    let message = new TextEncoder().encode(JSON.stringify(messageToEncode))
    let encryptedMessage
    let decryptedMessage
    beforeAll(() => {
      return encryptMessage(publicKey, message)
        .then((value) => {
          encryptedMessage = value
          return decryptMessage(privateKey, encryptedMessage)
            .then((decryptedValue) => {
              decryptedMessage = new TextDecoder().decode(decryptedValue)
            })
        })
    })

    it('it should match original object', () => {
      expect(JSON.parse(decryptedMessage)).toMatchObject(messageToEncode)
    })
  })
})
