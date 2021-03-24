// WebCrypto functionality requires the ability to encode and decode text and access it from the window.
import encoding from 'text-encoding'
window.TextEncoder = encoding.TextEncoder
window.TextDecoder = encoding.TextDecoder

// Gives us access to a implementation of WebCrypto in Node which is available in the broswer but missing on the command line.
import { Crypto } from "node-webcrypto-ossl";
window.crypto = new Crypto();
