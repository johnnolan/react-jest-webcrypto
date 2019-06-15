import React, { Component } from 'react'
import './App.css'
import './a11y-dark.css'
import { WebCryptoEncryption } from './components/index'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

class App extends Component {
  render () {
    return (
      <Container maxWidth='sm'>
        <Typography variant='h1' component='h1' gutterBottom>
          Test WebCrypto
        </Typography>
        <WebCryptoEncryption />
      </Container>
    )
  }
}

export default App
