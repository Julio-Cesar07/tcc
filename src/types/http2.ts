import { typeEventEmitter } from "./event-emitter";
import { typeNetServer } from "./net";
import { typeStreamReadable } from "./stream";
import { typeTlsServer } from "./tls";

function typeHttp2(function_name: string){
    switch (function_name) {
        case 'connect':
            return ['cb', 'ro'];
        case 'createServer':
        case 'createSecureServer':
            return ['cb', 'ro', 'oc'];
        default:
            console.log('Http2 ' + function_name)
            return []
    }
}

function typeHttp2ClientHttp2Session(function_name: string){
    switch (function_name) {
        default:
            return typeEventEmitter(function_name)
    }
}
function typeHttp2Server(function_name: string){
    switch (function_name) {
        default:
            return typeNetServer(function_name)
    }
}
function typeHttp2SecureServer(function_name: string){
    switch (function_name) {
        default:
            return typeTlsServer(function_name)
    }
}
function typeHttp2ServerRequest(function_name: string){
    switch (function_name) {
        default:
            return typeStreamReadable(function_name)
    }
}
function typeHttp2ServerResponse(function_name: string){
    switch (function_name) {
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseHttp2(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'http2': 
            types_returns = typeHttp2(function_name);
            break;
        case 'http2.ClientHttp2Session"': 
            types_returns = typeHttp2ClientHttp2Session(function_name);
            break;
        case 'http2.Http2Server': 
            types_returns = typeHttp2Server(function_name);
            break;
        case 'http2.Http2SecureServer': 
            types_returns = typeHttp2SecureServer(function_name);
            break;
        case 'http2.Http2ServerRequest': 
            types_returns = typeHttp2ServerRequest(function_name);
            break;
        case 'http2.Http2ServerResponse': 
            types_returns = typeHttp2ServerResponse(function_name);
            break;
        default: 
            console.log('http2 not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}