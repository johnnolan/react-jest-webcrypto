import React from 'react'
import { exportjwkPrivateKey, exportjwkPublicKey } from '../lib/exportKeys'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from '@material-ui/core/Typography'

class ExportKeys extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const key = this.props.rootKey

    exportjwkPublicKey(key)
      .then((jwkPublicKey) => {
        exportjwkPrivateKey(key)
          .then((jwkPrivateKey) => {
            this.props.onExportKeys(
              jwkPublicKey,
              jwkPrivateKey
            )
          })
      })
  }

  render () {
    return (
      <>
        <div>
          <RaisedButton
            disabled={!this.props.isRootKeySet}
            onClick={this.handleChange}
            label='Export Root RSA-OAEPKeys' />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Exported JWK Public Key</Typography>
          <textarea rows='6' cols='100' readOnly value={JSON.stringify(this.props.jwkPublicKey)} />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Exported JWK Private Key</Typography>
          <textarea rows='6' cols='100' readOnly value={JSON.stringify(this.props.jwkPrivateKey)} />
        </div>
      </>
    )
  }
}

export default ExportKeys
