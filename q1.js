const crypto = require('crypto')


// São geradas os pares de chaves publicas e privadas  aleatórias

const keys1 = crypto.generateKeyPairSync('rsa',{modulusLength: 2048})
const keys2 = crypto.generateKeyPairSync('rsa',{modulusLength: 2048})


const publicKey1 = keys1.publicKey
const privateKey1 = keys1.privateKey

const publicKey2 = keys2.publicKey
const privateKey2 = keys2.privateKey



// É criada uma mensagem

const messageP1 = 'Olá pessoa 2!!'

console.log('Mensagem a ser cifrada: ', messageP1)

// Agora, usando a chave publica gerada iremos cifrar a mensagem

const encryptedMessageP1 = crypto.publicEncrypt(
    {
        key: publicKey1,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'

    },
    // aqui convertemos e passamos a mensagem como  um buffer
    Buffer.from(messageP1)
)

console.log("Mensagem cifrada enviada para a pessoa 2: ", encryptedMessageP1.toString('base64'));

// Agora iremos decifrar a mensagem cifrada

const decryptedMessageP1 = crypto.privateDecrypt(
    {
      key: privateKey1,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedMessageP1
  );
  
  console.log("Mensagem decifrada recebida pela pessoa 2: ", decryptedMessageP1.toString());

  // Mensagem recebida pela pessoa 2, entao ele envia uma mensagem

  const messageP2 = 'Olá pessoa 1, como vai?'

  //ciframos a mensagem  com a public key da pessoa 2
  console.log('Mensagem a ser cifrada: ', messageP2)

  const encryptedMessageP2 = crypto.publicEncrypt(
    {
        key: publicKey2,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'

    },
    // aqui convertemos e passamos a mensagem como  um buffer
    Buffer.from(messageP2)
)

console.log("Mensagem cifrada enviada para a pessoa 1: ", encryptedMessageP2.toString('base64'));

// decifrada a mensagem da pessoa 2

const decryptedMessageP2 = crypto.privateDecrypt(
    {
      key: privateKey2,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedMessageP2
  );
  
  console.log("Mensagem decifrada recebida pela pessoa 1: ", decryptedMessageP2.toString());

  //fim