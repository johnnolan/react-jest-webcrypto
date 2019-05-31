import React from 'react'
import { generateKey } from '../lib/rootRSAOAEPKey'

class RootRSAOAEPKey extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    generateKey()
      .then((key) => {
        console.log('### RootRSAOAEPKey ###')
        console.log('key.publicKey', key.publicKey)
        console.log('key.privateKey', key.privateKey)

        this.props.onGenerateKey(key)
      })
  }

  render () {
    return (
      <>
        <div>
          <button onClick={this.handleChange}>
            Generate Root RSA-OAEPKey
          </button>
        </div>
        <div>
          <p>Open your console to see the generated root CryptoKey</p>
        </div>
      </>
    )
  }
}

export default RootRSAOAEPKey
