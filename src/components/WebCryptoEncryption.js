import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
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
      jwtPublicKey: '',
      jwtPrivateKey: '',
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
        <section>
          <Typography variant='h2' component='h2' gutterBottom>Step 1: Root Certificate (PBK)</Typography>
          <RootRSAOAEPKey
            onGenerateKey={this.handleRootRSAOAEPKeyChange}
          />
          <Typography variant='body1' gutterBottom>Root Key Set: {this.state.isRootRSAOAEPKeySet.toString()}</Typography>
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 2: Export Keys</Typography>
          <ExportKeys
            onExportKeys={this.handleExportKeys}
            rootKey={this.state.RootRSAOAEPKey}
            jwtPublicKey={this.state.jwtPublicKey}
            jwtPrivateKey={this.state.jwtPrivateKey}
            isRootKeySet={this.state.isRootRSAOAEPKeySet}
          />
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 3: Import Key</Typography>
          <ImportKeys
            onImportKeys={this.handleImportKeys}
            jwtPublicKey={this.state.jwtPublicKey}
            jwtPrivateKey={this.state.jwtPrivateKey}
            importedPublicKey={this.state.importedPublicKey}
            importedPrivateKey={this.state.importedPrivateKey}
          />
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 4: SHA Encrypt Object</Typography>
          <EncryptMessage
            onEncryptMessage={this.handleEncryptMessage}
            onMessageToEncryptChange={this.handleMessageToEncryptChange}
            importedPublicKey={this.state.importedPublicKey}
            messageToEncrypt={this.state.messageToEncrypt}
            encryptedMessage={this.state.encryptedMessage}
          />
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 5: SHA Decrypt</Typography>
          <DecryptMessage
            onDecryptMessage={this.handleDecryptMessage}
            importedPrivateKey={this.state.importedPrivateKey}
            encryptedMessage={this.state.encryptedMessage}
            decryptedMessage={this.state.decryptedMessage}
          />
        </section>
      </>
    )
  }
}

export default WebCryptoEncryption
