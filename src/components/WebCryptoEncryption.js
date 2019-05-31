import React from 'react'
import {
  RootRSAOAEPKey,
  ExportKeys,
  ImportKeys,
  EncryptMessage,
  DecryptMessage
} from './index'

class WebCryptoEncryption extends React.Component {
  constructor (props) {
    super(props)
    this.handleRootRSAOAEPKeyChange = this.handleRootRSAOAEPKeyChange.bind(this)
    this.handleExportKeys = this.handleExportKeys.bind(this)
    this.handleImportKeys = this.handleImportKeys.bind(this)
    this.handleEncryptMessage = this.handleEncryptMessage.bind(this)
    this.handleMessageToEncryptChange = this.handleMessageToEncryptChange.bind(this)
    this.handleDecryptMessage = this.handleDecryptMessage.bind(this)
    this.state = {
      RootRSAOAEPKey: {},
      jwtPublicKey: {},
      jwtPrivateKey: {},
      isRootRSAOAEPKeySet: false,
      importedPublicKey: '',
      importedPrivateKey: '',
      encryptedMessage: '',
      messageToEncrypt: 'Hello World! 12345',
      decryptedMessage: ''
    }
  }

  handleRootRSAOAEPKeyChange (key) {
    this.setState({
      RootRSAOAEPKey: key,
      isRootRSAOAEPKeySet: true
    })
  }

  handleExportKeys (jwtPublicKey, jwtPrivateKey) {
    this.setState({
      jwtPublicKey: jwtPublicKey,
      jwtPrivateKey: jwtPrivateKey
    })
  }

  handleImportKeys (importedPublicKey, importedPrivateKey) {
    this.setState({
      importedPublicKey: importedPublicKey,
      importedPrivateKey: importedPrivateKey
    })
  }

  handleEncryptMessage (encryptedMessage) {
    this.setState({
      encryptedMessage: encryptedMessage
    })
  }

  handleMessageToEncryptChange (message) {
    this.setState({
      messageToEncrypt: message
    })
  }

  handleDecryptMessage (decryptedMessage) {
    this.setState({
      decryptedMessage: decryptedMessage
    })
  }

  render () {
    return (
      <>
        <h2>Root Certificate (PBK)</h2>
        <RootRSAOAEPKey
          onGenerateKey={this.handleRootRSAOAEPKeyChange}
        />
        <p>Root Key Set: {this.state.isRootRSAOAEPKeySet.toString()}</p>
        <h2>Export Keys</h2>
        <ExportKeys
          onExportKeys={this.handleExportKeys}
          rootKey={this.state.RootRSAOAEPKey}
          jwtPublicKey={this.state.jwtPublicKey}
          jwtPrivateKey={this.state.jwtPrivateKey}
        />
        <h2>Import Key</h2>
        <ImportKeys
          onImportKeys={this.handleImportKeys}
          jwtPublicKey={this.state.jwtPublicKey}
          jwtPrivateKey={this.state.jwtPrivateKey}
          importedPublicKey={this.state.importedPublicKey}
          importedPrivateKey={this.state.importedPrivateKey}
        />
        <h2>SHA Encrypt Object</h2>
        <EncryptMessage
          onEncryptMessage={this.handleEncryptMessage}
          onMessageToEncryptChange={this.handleMessageToEncryptChange}
          importedPublicKey={this.state.importedPublicKey}
          messageToEncrypt={this.state.messageToEncrypt}
          encryptedMessage={this.state.encryptedMessage}
        />
        <h2>SHA Decrypt</h2>
        <DecryptMessage
          onDecryptMessage={this.handleDecryptMessage}
          importedPrivateKey={this.state.importedPrivateKey}
          encryptedMessage={this.state.encryptedMessage}
          decryptedMessage={this.state.decryptedMessage}
        />
      </>
    )
  }
}

export default WebCryptoEncryption
