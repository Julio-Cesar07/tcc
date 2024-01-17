import { typeEventEmitter } from "./event-emitter";

function typeDgram(function_name: string){
    switch (function_name) {
        case 'createSocket':
            return ['cb', 'ro'];
        default:
            return typeEventEmitter(function_name)
    }
}

function typeDgramSocket(function_name: string) {
    switch (function_name) {
        case 'bind':
        case 'close':
        case 'connect':
        case 'send':
            return ['cb'];
        default:
            console.log('DgramSocket ' + function_name)
            return []
    }
}

export function chooseDgram(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'dgram': 
            types_returns = typeDgram(function_name);
            break;
        case 'dgram.Socket': 
            types_returns = typeDgramSocket(function_name);
            break;
        default: 
            console.log('dgram not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}