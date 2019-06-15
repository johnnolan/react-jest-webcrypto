import { generateKey } from './rootRSAOAEPKey'
import { exportjwkPublicKey, exportjwkPrivateKey } from './exportKeys'
import { importPublicFromJwk, importPrivateFromJwk } from './importKeys'
import { encryptMessage } from './encryptMessage'
import { decryptMessage } from './decryptMessage'

describe('Given I try to Encrypt a new message', () => {
  let generatedKey
  let publicJwkToken
  let publicKey
  let privateJwkToken
  let privateKey

  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
        return exportjwkPublicKey(generatedKey)
          .then((key) => {
            publicJwkToken = key
            return exportjwkPrivateKey(generatedKey)
              .then((key) => {
                privateJwkToken = key
                return importPublicFromJwk(publicJwkToken)
                  .then((key) => {
                    publicKey = key
                    return importPrivateFromJwk(privateJwkToken)
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
