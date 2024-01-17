import { typeEventEmitter } from "./event-emitter";

function typeProcess(function_name: string){
    switch (function_name) {
        case 'send':
            return ['cb'];
        case 'Socket':
        case 'stderr':
        case 'stdout':
        case 'stdin':
            return ['op'];
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseProcess(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'process': 
            types_returns = typeProcess(function_name);
            break;
        default: 
            console.log('process not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}