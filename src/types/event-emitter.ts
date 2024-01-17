export function typeEventEmitter(function_name: string){
    switch (function_name) {
        case 'on':
        case 'addListener':
        case 'prependListener':
        case 'prependOnceListener':
        case 'once':
            return ['cb'];
        default:
            console.log('EventEmitter ' + function_name)
            return []
    }
}

export function chooseEventEmitter(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'EventEmitter': 
            types_returns = typeEventEmitter(function_name);
            break;
        default: 
            console.log('eventemitter not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}