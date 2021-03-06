import { generateKey } from './rootRSAOAEPKey'

describe('Given I generate a new RSA-OAEP key', () => {
  let generatedKey
  beforeAll(() => {
    return generateKey()
      .then((key) => {
        generatedKey = key
      })
  })

  describe('And the Private Key has been generated', () => {
    it('it should return a privateKey', () => {
      expect(generatedKey.privateKey).not.toBeNull()
    })

    it('it should have a usage of decrypt', () => {
      expect(generatedKey.privateKey.usages[0]).toBe('decrypt')
    })
  })

  describe('And the Public Key has been generated', () => {
    it('it should return a publicKey', () => {
      expect(generatedKey.publicKey).not.toBeNull()
    })

    it('it should have a usage of encrypt', () => {
      expect(generatedKey.publicKey.usages[0]).toBe('encrypt')
    })
  })
})
