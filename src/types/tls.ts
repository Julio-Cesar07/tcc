import { typeNetServer, typeNetSocket } from "./net";

function typeTls(function_name: string){
    switch (function_name) {
        case 'connect':
            return ['cb', 'ro'];
        case 'createServer':
            return ['cb', 'ro', 'co'];
        case 'Server':
            return ['oc', 'ro', 'co', 'cb'];
        case 'TLSSocket':
            return ['oc', 'ro'];
        default:
            console.log('Tls ' + function_name)
            return []
    }
}

function typeTlsSocket(function_name: string){
    switch (function_name) {
        default:
            return typeNetSocket(function_name)
    }
}

export function typeTlsServer(function_name: string){
    switch (function_name) {
        default:
            return typeNetServer(function_name)
    }
}

export function chooseTls(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'tls': 
            types_returns = typeTls(function_name);
            break;
        case 'tls.TLSSocket': 
            types_returns = typeTlsSocket(function_name);
            break;
        case 'tls.Server': 
            types_returns = typeTlsServer(function_name);
            break;
        default: 
            console.log('tls not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}