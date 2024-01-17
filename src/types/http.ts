import { typeEventEmitter } from "./event-emitter";
import { typeNetServer } from "./net";

function typeHttp(function_name: string){
    switch (function_name) {
        case 'Agent':
            return ['oc', 'ro'];
        case 'get':
        case 'request':
        case 'createServer':
            return ['cb', 'ro', 'co'];
        case 'Server': 
            return ['oc', 'ro', 'co', 'cb']
        default:
            console.log('Http ' + function_name)
            return []
    }
}

function typeHttpAgent(function_name: string){
    switch (function_name) {
        case 'createConnection':
            return ['cb', 'ro'];
        default:
            console.log('HttpAgent ' + function_name)
            return []
    }
}

function typeHttpClientRequest(function_name: string){
    switch (function_name) {
        case 'setTimeout':
        case 'write':
        case 'end':
            return ['cb'];
        default:
            return typeEventEmitter(function_name)
    }
}

function typeHttpIncomingMessage(function_name: string){
    switch (function_name) {
        case 'setTimeout':
            return ['cb'];
        case 'socket':
            return ['op']
        default:
            return typeEventEmitter(function_name)
    }
}

function typeHttpServer(function_name: string){
    switch (function_name) {
        case 'setTimeout':
            return ['cb'];
        default:
            return typeNetServer(function_name)
    }
}

function typeHttpServerResponse(function_name: string){
    switch (function_name) {
        case 'write':
        case 'end':
        case 'setTimeout':
            return ['cb'];
        case 'connection':
        case 'socket':
            return ['op']
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseHttp(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'http': 
            types_returns = typeHttp(function_name);
            break;
        case 'http.Agent': 
            types_returns = typeHttpAgent(function_name);
            break;
        case 'http.ClientRequest': 
            types_returns = typeHttpClientRequest(function_name);
            break;
        case 'http.IncomingMessage': 
            types_returns = typeHttpIncomingMessage(function_name);
            break;
        case 'http.Server': 
            types_returns = typeHttpServer(function_name);
            break;
        case 'http.ServerResponse': 
            types_returns = typeHttpServerResponse(function_name);
            break;
        default: 
            console.log('http not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}