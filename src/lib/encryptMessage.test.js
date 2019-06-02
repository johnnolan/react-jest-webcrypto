import { generateKey } from './rootRSAOAEPKey'
import { exportJwtPublicKey, exportJwtPrivateKey } from './exportKeys'
import { importPrivateFromJwk, importPublicFromJwk } from './importKeys'
import { encryptMessage } from './encryptMessage'

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
