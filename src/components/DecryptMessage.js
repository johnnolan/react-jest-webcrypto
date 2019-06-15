import React from 'react'
import { decryptMessage } from '../lib/decryptMessage'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

class DecryptMessage extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const privateKey = this.props.importedPrivateKey
    const encryptedMessage = this.props.encryptedMessage

    decryptMessage(privateKey, encryptedMessage)
      .then((decryptedMessage) => {
        this.props.onDecryptMessage(
          new TextDecoder().decode(decryptedMessage)
        )
      })
  }

  render () {
    return (
      <>
        <div>
          <RaisedButton
            disabled={this.props.importedPrivateKey === '' || this.props.encryptedMessage === ''}
            onClick={this.handleChange}
            label='Decrypt Message' />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Decrypted Message</Typography>
          <textarea rows='6' cols='100' readOnly value={this.props.decryptedMessage} />
        </div>
      </>
    )
  }
}

export default DecryptMessage
