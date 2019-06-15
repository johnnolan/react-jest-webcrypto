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
import { Link } from '@material-ui/core';

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
      jwkPublicKey: '',
      jwkPrivateKey: '',
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

  handleExportKeys (jwkPublicKey, jwkPrivateKey) {
    this.setState({
      jwkPublicKey: jwkPublicKey,
      jwkPrivateKey: jwkPrivateKey
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
          <Typography component='p' gutterBottom>
            Hello and welcome! My aim here is to try and give a clear example of how we can use WebCrypto in a simple
            use case and hopefully give you an idea of how you can use it, test it and implement it into your own projects.
          </Typography>
          <Typography component='p' gutterBottom>
            I will try and give an example User Story that will give us an overview of what we need to achieve and then step
            by step how we achieve this.
          </Typography>
          <Typography component='p' gutterBottom>
            Each step will include a link to the react component, encryption library component needed and a explanation of what
            each is doing.
          </Typography>
        </section>
        <section>
          <Typography variant='h3' component='h3' gutterBottom>
              User Stories
          </Typography>
          <Typography component='p' gutterBottom>
            <ol>
              <li>A user should be able to generate a new, unique encryption key</li>
              <li>They will be able to export the private and public keys in a format that can be saved</li>
              <li>They will be able to re-import these keys to use</li>
              <li>They will be able to encrypt a message using their public key</li>
              <li>They will be able to decrypt their message using their private key</li>
            </ol>
          </Typography>
          <Divider variant='middle' />
        </section>
        <section>
          <Typography variant='h2' component='h2' gutterBottom>Step 1: Root Certificate (PBK)</Typography>
          <Typography component='p' gutterBottom>
            <strong>User Story:</strong> A user should be able to generate a new, unique encryption key
          </Typography>
          <Typography component='p' gutterBottom>
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/components/RootRSAOAEPKey.js'>
              <strong>Code: </strong>React Component
            </Link>
            <br />
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/lib/RootRSAOAEPKey.js'>
              <strong>Code: </strong>Lib
            </Link>
          </Typography>
          <Typography component='p' gutterBottom>
          </Typography>
          <RootRSAOAEPKey
            onGenerateKey={this.handleRootRSAOAEPKeyChange}
          />
          <Typography variant='body1' gutterBottom>Root Key Set: {this.state.isRootRSAOAEPKeySet.toString()}</Typography>
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 2: Export Keys</Typography>

          <Typography component='p' gutterBottom>
            <strong>User Story:</strong> They will be able to export the private and public keys in a format that can be saved
          </Typography>
          <Typography component='p' gutterBottom>
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/components/ExportKeys.js'>
              <strong>Code: </strong>React Component
            </Link>
            <br />
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/lib/exportKeys.js'>
              <strong>Code: </strong>Lib
            </Link>
          </Typography>
          <Typography component='p' gutterBottom>
          </Typography>

          <ExportKeys
            onExportKeys={this.handleExportKeys}
            rootKey={this.state.RootRSAOAEPKey}
            jwkPublicKey={this.state.jwkPublicKey}
            jwkPrivateKey={this.state.jwkPrivateKey}
            isRootKeySet={this.state.isRootRSAOAEPKeySet}
          />
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 3: Import Key</Typography>

          <Typography component='p' gutterBottom>
            <strong>User Story:</strong> They will be able to re-import these keys to use
          </Typography>
          <Typography component='p' gutterBottom>
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/components/ImportKeys.js'>
              <strong>Code: </strong>React Component
            </Link>
            <br />
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/lib/importKeys.js'>
              <strong>Code: </strong>Lib
            </Link>
          </Typography>
          <Typography component='p' gutterBottom>
          </Typography>

          <ImportKeys
            onImportKeys={this.handleImportKeys}
            jwkPublicKey={this.state.jwkPublicKey}
            jwkPrivateKey={this.state.jwkPrivateKey}
            importedPublicKey={this.state.importedPublicKey}
            importedPrivateKey={this.state.importedPrivateKey}
          />
        </section>
        <section>
          <Divider variant='middle' />
          <Typography variant='h2' component='h2' gutterBottom>Step 4: SHA Encrypt Object</Typography>

          <Typography component='p' gutterBottom>
            <strong>User Story:</strong> They will be able to encrypt a message using their public key
          </Typography>
          <Typography component='p' gutterBottom>
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/components/EncryptMessage.js'>
              <strong>Code: </strong>React Component
            </Link>
            <br />
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/lib/encryptMessage.js'>
              <strong>Code: </strong>Lib
            </Link>
          </Typography>
          <Typography component='p' gutterBottom>
          </Typography>

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

          <Typography component='p' gutterBottom>
            <strong>User Story:</strong> They will be able to decrypt their message using their private key
          </Typography>
          <Typography component='p' gutterBottom>
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/components/DecryptMessage.js'>
              <strong>Code: </strong>React Component
            </Link>
            <br />
            <Link href='https://github.com/johnnolan/react-jest-webcrypto/blob/master/src/lib/decryptMessage.js'>
              <strong>Code: </strong>Lib
            </Link>
          </Typography>
          <Typography component='p' gutterBottom>
          </Typography>

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
