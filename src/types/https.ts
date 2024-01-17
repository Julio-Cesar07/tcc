function typeHttps(function_name: string){
    switch (function_name) {
        case 'Agent':
            return ['oc', 'ro'];
        case 'Server':
            return ['oc', 'ro', 'co', 'cb'];
        case 'get':
        case 'request':
        case 'createServer':
            return ['cb', 'ro', 'co'];
        default:
            console.log('Https ' + function_name)
            return []
    }
}

export function chooseHttps(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'https': 
            types_returns = typeHttps(function_name);
            break;
        default: 
            console.log('https not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}