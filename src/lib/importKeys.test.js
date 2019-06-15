import { generateKey } from './rootRSAOAEPKey'
import { exportjwkPublicKey, exportjwkPrivateKey } from './exportKeys'
import { importPrivateFromJwk, importPublicFromJwk } from './importKeys'

describe('Given I try to import the exported jwk', () => {
  let generatedKey
  let privateJwkToken
  let publicJwkToken

  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
        return exportjwkPrivateKey(generatedKey)
          .then((key) => {
            privateJwkToken = key
            return exportjwkPublicKey(generatedKey)
              .then((key) => {
                publicJwkToken = key
              })
          })
      })
  })

  describe('And it is the public key', () => {
    let publicKey
    beforeAll(() => {
      return importPublicFromJwk(publicJwkToken)
        .then((key) => {
          publicKey = key
        })
    })

    it('it should not be null', () => {
      expect(publicKey).not.toBeNull()
    })
  })

  describe('And it is the private key', () => {
    let privateKey
    beforeAll(() => {
      return importPrivateFromJwk(privateJwkToken)
        .then((key) => {
          privateKey = key
        })
    })

    it('it should not be null', () => {
      expect(privateKey).not.toBeNull()
    })
  })
})
