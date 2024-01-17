function typeUtil(function_name: string){
    switch (function_name) {
        case 'promisify':
            return ['promisify'];
        default:
            console.log('Util ' + function_name)
            return []
    }
}

export function chooseUtil(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'util': 
            types_returns = typeUtil(function_name);
            break;
        default: 
            console.log('util not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}