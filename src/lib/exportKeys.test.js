import { generateKey } from './rootRSAOAEPKey'
import { exportJwtPublicKey, exportJwtPrivateKey } from './exportKeys'
import encoding from 'text-encoding'
window.TextEncoder = encoding.TextEncoder
window.TextDecoder = encoding.TextDecoder
window.atob = require('atob')
var WebCrypto = require('node-webcrypto-ossl')
window.crypto = new WebCrypto()

describe('Given I try to export the generated key', () => {
  let generatedKey
  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
      })
  })

  describe('And I export the key as a jwt token to use for encryption', () => {
    let privateJwtToken
    beforeAll(() => {
      return exportJwtPrivateKey(generatedKey)
        .then((key) => {
          privateJwtToken = key
        })
    })

    it('it should not be null', () => {
      expect(privateJwtToken).not.toBeNull()
    })
  })

  describe('And I export the key as a jwt token to use for encryption', () => {
    let publicJwtToken
    beforeAll(() => {
      return exportJwtPublicKey(generatedKey)
        .then((key) => {
          publicJwtToken = key
        })
    })

    it('it should not be null', () => {
      expect(publicJwtToken).not.toBeNull()
    })
  })
})
