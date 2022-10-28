const fs = require('fs');
const crypto = require('crypto')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');



const rl = readline.createInterface({ input, output });


// Função para fazer uma pergunta ao input e retornar resposta
function makeQuestion(question) {
    return new Promise(resolve => rl.question(question, answ => resolve(answ)))
}


//Pegar diretorio da chave publica
async function getPublicKeyDirectoryQuestion(){
    const directory = await makeQuestion('Digite o diretorio da chave publica: ')

    return directory
}


//com o Diretorio, usamos a biblioteca node "fs" para ler o arquivo e retornamos a chave publica em buffer
async function readKeyDirectory(){
    const directory = await getPublicKeyDirectoryQuestion();
    const publicKey = fs.readFileSync(directory, (err) => {console.log(err)})
    return publicKey
}

//pegar diretorio arquivo de texto assinado
async function getSignedTxtDirectoryQuestion(){
    const directory = await makeQuestion('Digite o diretorio do arquivo de texto com a Assinatura: ')

    return directory

}
//pegar diretorio arquivo de texto original
async function getOriginaltxtDirectoryQuestion(){
    const directory = await makeQuestion('Digite o diretorio do arquivo de texto original: ')

    return directory

}

// aqui pegamos o conteudo do arquivo de texto assinado
async function readSignedTxtDirectory(){
    const directory = await getSignedTxtDirectoryQuestion();
    const signedTxt = fs.readFileSync(directory, (err) => {console.log(err)})
    return signedTxt
}
// aqui pegamos o conteudo do arquivo de texto original
async function readOriginaltxtDirectory(){
    const directory = await getOriginaltxtDirectoryQuestion();
    const originalTxt = fs.readFileSync(directory, (err) => {console.log(err)})
    return originalTxt
}

//agora iremos verificar a assinatura, usando a public Key, o arquivo de texto assinado e compararemos com o original
async function verifySign(){
    const publicKey = await readKeyDirectory()
    const signedTxt = await readSignedTxtDirectory()
    const originalTxt = await readOriginaltxtDirectory()


    const verifySign = crypto.verify('sha256', originalTxt, {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      },
      signedTxt
      );
    

    if(verifySign){
        console.log('Assinatura valida')
    }else{
        console.log('Assinatura invalida')
    }

    rl.close()
}

verifySign()

