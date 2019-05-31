import React from 'react'
import { exportJwtPrivateKey, exportJwtPublicKey } from '../lib/exportKeys'

class ExportKeys extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const key = this.props.rootKey

    exportJwtPublicKey(key)
      .then((jwtPublicKey) => {
        exportJwtPrivateKey(key)
          .then((jwtPrivateKey) => {
            this.props.onExportKeys(
              jwtPublicKey,
              jwtPrivateKey
            )
          })
      })
  }

  render () {
    return (
      <>
        <div>
          <button onClick={this.handleChange}>
            Export Root RSA-OAEPKeys
          </button>
        </div>
        <div>
          <p>Exported JWT Public Key</p>
          <textarea rows='6' cols='100' readOnly value={JSON.stringify(this.props.jwtPublicKey)} />
        </div>
        <div>
          <p>Exported JWT Private Key</p>
          <textarea rows='6' cols='100' readOnly value={JSON.stringify(this.props.jwtPrivateKey)} />
        </div>
      </>
    )
  }
}

export default ExportKeys
