import React from 'react'
import { importPrivateFromJwk, importPublicFromJwk } from '../lib/importKeys'

class ImportKeys extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const jwtPublicKey = this.props.jwtPublicKey
    const jwtPrivateKey = this.props.jwtPrivateKey

    importPublicFromJwk(jwtPublicKey)
      .then((importedPublicKey) => {
        importPrivateFromJwk(jwtPrivateKey)
          .then((importedPrivateKey) => {
            console.log('### Imported Keys ###')
            console.log('importedPublicKey', importedPublicKey)
            console.log('importedPrivateKey', importedPrivateKey)
            this.props.onImportKeys(
              importedPublicKey,
              importedPrivateKey
            )
          })
      })
  }

  render () {
    return (
      <>
        <div>
          <button onClick={this.handleChange}>
            Import Public and Private Key (Check console for CryptoKey)
          </button>
        </div>
        <div>
          <p>Imported Public Key: {(this.props.importedPublicKey !== '').toString()}</p>
        </div>
        <div>
          <p>Imported Private Key: {(this.props.importedPrivateKey !== '').toString()}</p>
        </div>
      </>
    )
  }
}

export default ImportKeys
