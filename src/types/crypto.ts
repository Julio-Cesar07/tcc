function typeCrypto(function_name: string) {
    switch (function_name) {
        case 'pbkdf2':
        case 'generateKeyPair':
        case 'randomBytes':
        case 'randomFill':
        case 'scrypt':
            return ['cb']
        case 'createCipher':
        case 'createCipheriv':
        case 'createDecipher':
        case 'createDecipheriv':
        case 'createHash':
        case 'createHmac':
            return ['ro']
        default:
            console.log('Crypto ' + function_name)
            return []
    }
}

export function chooseCrypto(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'crypto': 
            types_returns = typeCrypto(function_name);
            break;
        default: 
            console.log('crypto not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}