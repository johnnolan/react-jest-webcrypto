# Testing webcrypto using Jest for client side apps (React)

## Terminology

### Generate Root Certificate (RSA-OAEP)

This is your root key which is generated most likely server side. The private key generated is used on the server to read any messages encrypted with the public key which is to be used on the client side.

The private key generated can only decrypt messages and the public key is only ever able to encrypt messages. Without each other you are unable to access any data sent or recieved.

### Export Keys

### Import Keys

### SHA Encrypt Object

### SHA Decrypt
