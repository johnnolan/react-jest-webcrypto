import { generateKey } from './rootRSAOAEPKey'
import { exportjwkPublicKey, exportjwkPrivateKey } from './exportKeys'
describe('Given I try to export the generated key', () => {
  let generatedKey
  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
      })
  })

  describe('And I export the key as a JWK token to use for encryption', () => {
    let privateJwkToken
    beforeAll(() => {
      return exportjwkPrivateKey(generatedKey)
        .then((key) => {
          privateJwkToken = key
        })
    })

    it('it should not be null', () => {
      expect(privateJwkToken).not.toBeNull()
    })
  })

  describe('And I export the key as a JWK token to use for encryption', () => {
    let publicJwkToken
    beforeAll(() => {
      return exportjwkPublicKey(generatedKey)
        .then((key) => {
          publicJwkToken = key
        })
    })

    it('it should not be null', () => {
      expect(publicJwkToken).not.toBeNull()
    })
  })
})
