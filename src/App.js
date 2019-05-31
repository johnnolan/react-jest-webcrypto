import React, { Component } from 'react'
import './App.css'
import { WebCryptoEncryption } from './components/index'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Test WebCrypto</h1>
          <WebCryptoEncryption />
        </header>
      </div>
    )
  }
}

export default App
