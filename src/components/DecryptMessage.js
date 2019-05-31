import React from 'react'
import { decryptMessage } from '../lib/decryptMessage'

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
          <button onClick={this.handleChange}>
            Decrypt Message
          </button>
        </div>
        <div>
          <p>Decrypted Message</p>
          <textarea rows='6' cols='100' readOnly value={this.props.decryptedMessage} />
        </div>
      </>
    )
  }
}

export default DecryptMessage
