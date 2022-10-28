const fs = require('fs');
const crypto = require('crypto')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');



const rl = readline.createInterface({ input, output });


// Função para fazer uma pergunta ao input e retornar resposta
function makeQuestion(question) {
    return new Promise(resolve => rl.question(question, answ => resolve(answ)))
}


//Pegar diretorio da chave privada
async function getPrivateKeyDirectoryQuestion(){
    const directory = await makeQuestion('Digite o diretorio da chave privada: ')

    return directory
}


//com o Diretorio, usamos a biblioteca node "fs" para ler o arquivo e retornamos a chave privada em buffer
async function readKeyDirectory(){
    const directory = await getPrivateKeyDirectoryQuestion();
    const privateKey = fs.readFileSync(directory, (err) => {console.log(err)})
    return privateKey
}

//pegar diretorio arquivo de texto
async function getTxtDirectoryQuestion(){
    const directory = await makeQuestion('Digite o diretorio do arquivo de texto selecionado: ')

    return directory

}

// aqui pegamos o conteudo do arquivo de texto e retornamos ele junto com o nome do arquivo em conjunto em um array separado por cada / do diretorio
async function readTxtDirectory(){
    const directory = await getTxtDirectoryQuestion();
    const nameFile = directory.split('/')
    const txtContent = fs.readFileSync(directory, (err) => {console.log(err)})
    return [txtContent, nameFile]
}

//agora iremos assinar digitalmente usando o texto e a chave privada
async function signText(){
    const privateKey = await readKeyDirectory()
    const [text, array] = await readTxtDirectory()

    const sign = crypto.sign("sha256", text, {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      });

    // agora que assinamos vamos criar o arquivo contendo a assinatura


    
      //usamos o metodo pop pra pegar o ultimo elemento do array retornado diretorio, ou seja o nome do arquivo.
      //e o split com o . para separar o tipo do arquivo do nome
    const [nameFile, archiveType] = array.pop().split('.')

    //usando o wristeStream do modulo fs criamos o arquivo e escrevemos a assinatura digital nele.
    const writeStream = fs.createWriteStream(`${nameFile}_assinado.${archiveType}`)
    writeStream.write(sign)
    writeStream.end()
    rl.close()
}

signText()

