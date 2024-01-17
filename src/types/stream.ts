import { typeEventEmitter } from "./event-emitter";

export function typeStreamReadable(function_name: string){
    switch (function_name) {
        case '_read':
            return ['dd'];
        default:
            return typeEventEmitter(function_name)
    }
}

function typeStreamWritable(function_name: string){
    switch (function_name) {
        case 'write':
        case 'end':
        case '_write':
        case '_writev':
        case '_final':
            return ['cb'];
        default:
            return typeEventEmitter(function_name)
    }
}

export function typeStreamDuplex(function_name: string){
    switch (function_name) {
        case '_read': // typeStreamReadable
            return ['dd'];
        default:
            return typeStreamWritable(function_name) 
    }
}

export function typeStreamTransform(function_name: string){
    switch (function_name) {
        case '_transform':
        case '_flush':
            return ['cb'];
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseStream(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'stream.Readable': 
            types_returns = typeStreamReadable(function_name);
            break;
        case 'stream.Writable': 
            types_returns = typeStreamWritable(function_name);
            break;
        case 'stream.Duplex': 
            types_returns = typeStreamDuplex(function_name);
            break;
        case 'stream.Transform': 
            types_returns = typeStreamTransform(function_name);
            break;
        default: 
            console.log('stream not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}