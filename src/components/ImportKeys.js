import React from 'react'
import { importPrivateFromJwk, importPublicFromJwk } from '../lib/importKeys'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from '@material-ui/core/Typography'

class ImportKeys extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const jwkPublicKey = this.props.jwkPublicKey
    const jwkPrivateKey = this.props.jwkPrivateKey

    importPublicFromJwk(jwkPublicKey)
      .then((importedPublicKey) => {
        importPrivateFromJwk(jwkPrivateKey)
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
          <RaisedButton
            onClick={this.handleChange}
            label={'Import Public and Private Key (Check console for CryptoKey)'}
            disabled={(this.props.jwkPublicKey === '')}
          />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Imported Public Key: {(this.props.importedPublicKey !== '').toString()}</Typography>
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Imported Private Key: {(this.props.importedPrivateKey !== '').toString()}</Typography>
        </div>
      </>
    )
  }
}

export default ImportKeys
