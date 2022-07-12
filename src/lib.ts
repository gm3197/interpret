export const arrayBufferToBase64 = (buffer: ArrayBufferLike): string => {
  let binary = ""
  let bytes = new Uint8Array(buffer)
  let len = bytes.length
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export const base64ToArrayBuffer = (base64: string): ArrayBufferLike => {
  let binStr = window.atob(base64)
  let len = binStr.length
  let bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binStr.charCodeAt(i)
  }
  return bytes.buffer
}

export const hexToArrayBuffer = (hex: string): ArrayBufferLike => {
  let typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  }))
  return typedArray.buffer
}

export const arrayBufferToHex = (buffer: ArrayBufferLike): string => {
  return Array.from(new Uint8Array(buffer), (byte) => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join("")
}

export const binaryStringToArrayBuffer = (binary: string): ArrayBufferLike => {
  let bytesCount = binary.length / 8
  let typedArray = new Uint8Array(bytesCount)
  for (var i = 0; i < bytesCount; i++) {
    let byte = binary.substring(i*8, (i*8) + 8)
    typedArray[i] = parseInt(byte, 2)
  }
  return typedArray.buffer
}

export const asciiStringToArrayBuffer = (text: string): ArrayBufferLike => {
  let typedArray = new Uint8Array(text.length)
  for (var i = 0; i < text.length; i++) {
    typedArray[i] = text.charCodeAt(i)
  }
  return typedArray.buffer
}

export const base64urlToBase64 = (base64url: string): string => {
  return base64url.replace(/\-/g, "+").replace(/\_/g, "/")
}

export const camelCaseToString = (name: string): string => {
  if (!name) {
    return ""
  }
  let str = name[0].toUpperCase() + name.substring(1).replace(/([A-Z])/g," $1")
  let words = str.split(" ")
  let res = ""
  for (var i = 0; i < words.length; i++) {
    if (words[i].length == 1 && words[i].match(/[A-Z]/)) {
      res += words[i]
    } else {
      if (i == 0) {
        res += words[i]
      } else {
        res += " " + words[i]
      }
    }
  }
  return res
}
