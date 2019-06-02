import React from 'react'
import { generateKey } from '../lib/rootRSAOAEPKey'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from '@material-ui/core/Typography'

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
          <RaisedButton
            onClick={this.handleChange}
            label='Generate Root RSA-OAEPKey'
          />
        </div>
        <div>
          <Typography variant='body1' gutterBottom>
            Open your console to see the generated root CryptoKey
          </Typography>
        </div>
      </>
    )
  }
}

export default RootRSAOAEPKey
