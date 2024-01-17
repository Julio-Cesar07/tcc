import { typeEventEmitter } from "./event-emitter";
import { typeStreamDuplex } from "./stream";

function typeNet(function_name: string){
    switch (function_name) {
        case 'connect':
        case 'createConnection':
            return ['cb', 'ro'];
        case 'Socket':
            return ['oc', 'ro'];
        case 'createServer':
            return ['cb', 'ro', 'co'];
        case 'Server':
            return ['oc', 'ro', 'co', 'cb'];
        default:
            console.log('Net ' + function_name)
            return []
    }
}

export function typeNetSocket(function_name: string){
    switch (function_name) {
        case 'connect':
        case 'end':
        case 'setTimeout':
        case 'write':
            return ['cb'];
        default:
            return typeStreamDuplex(function_name)
    }
}

export function typeNetServer(function_name: string){
    switch (function_name) {
        case 'close':
        case 'getConnections':
        case 'listen':
            return ['cb'];
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseNet(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'net': 
            types_returns = typeNet(function_name);
            break;
        case 'net.Socket': 
            types_returns = typeNetSocket(function_name);
            break;
        case 'net.Server': 
            types_returns = typeNetServer(function_name);
            break;
        default: 
            console.log('net not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}