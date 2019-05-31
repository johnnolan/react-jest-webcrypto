export function convertStringToArrayBufferView (str) {
  var bytes = new Uint8Array(str.length)
  for (var iii = 0; iii < str.length; iii++) {
    bytes[iii] = str.charCodeAt(iii)
  }

  return bytes
}

export function convertArrayBufferToHexaDecimal (buffer) {
  var dataView = new DataView(buffer)
  var iii; var len; var hex = ''; var c

  for (iii = 0, len = dataView.byteLength; iii < len; iii += 1) {
    c = dataView.getUint8(iii).toString(16)
    if (c.length < 2) {
      c = '0' + c
    }

    hex += c
  }

  return hex
}

export function buf2hex (buf) {
  return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('')
}

export function hexToArrayBuffer (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected input to be a string')
  }

  if ((hex.length % 2) !== 0) {
    throw new RangeError('Expected string to be an even number of characters')
  }

  var view = new Uint8Array(hex.length / 2)

  for (var i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }

  return view.buffer
}
