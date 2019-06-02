import { generateKey } from './rootRSAOAEPKey'
import { exportJwtPublicKey, exportJwtPrivateKey } from './exportKeys'
import { importPrivateFromJwk, importPublicFromJwk } from './importKeys'

describe('Given I try to import the exported jwk', () => {
  let generatedKey
  let privateJwtToken
  let publicJwtToken

  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
        return exportJwtPrivateKey(generatedKey)
          .then((key) => {
            privateJwtToken = key
            return exportJwtPublicKey(generatedKey)
              .then((key) => {
                publicJwtToken = key
              })
          })
      })
  })

  describe('And it is the public key', () => {
    let publicKey
    beforeAll(() => {
      return importPublicFromJwk(publicJwtToken)
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
      return importPrivateFromJwk(privateJwtToken)
        .then((key) => {
          privateKey = key
        })
    })

    it('it should not be null', () => {
      expect(privateKey).not.toBeNull()
    })
  })
})
