import React from 'react'
import { encryptMessage } from '../lib/encryptMessage'
import { buf2hex } from '../lib/utils'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from '@material-ui/core/Typography'

class EncryptMessage extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const publicKey = this.props.importedPublicKey
    let message = new TextEncoder().encode(this.props.messageToEncrypt)

    encryptMessage(publicKey, message)
      .then((encryptedMessage) => {
        this.props.onEncryptMessage(
          encryptedMessage
        )
      })
  }

  handleMessageChange (event) {
    this.props.onMessageToEncryptChange(
      event.target.value
    )
  }

  render () {
    return (
      <>
        <div>
          <RaisedButton
            disabled={this.props.importedPublicKey === ''}
            onClick={this.handleChange}
            label='Encrypt Message' />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Message to Encrypt</Typography>
          <textarea rows='6' cols='100' value={this.props.messageToEncrypt} onChange={this.handleMessageChange} />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>Encrypted Message (ArrayBuffer to Hex for demo)</Typography>
          <textarea rows='6' cols='100' readOnly value={buf2hex(this.props.encryptedMessage)} />
        </div>
      </>
    )
  }
}

export default EncryptMessage
