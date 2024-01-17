import { typeStreamTransform } from "./stream";

function typeZlib(function_name: string){
    switch (function_name) {
        case 'deflate':
        case 'gzip':
        case 'deflateRaw':
        case 'unzip':
        case 'inflate':
        case 'gunzip':
        case 'inflateRaw':
        case 'brotliCompress':
        case 'brotliDecompress':
            return ['cb'];
        case 'createDeflate':
        case 'createInflate':
        case 'createDeflateRaw':
        case 'createInflateRaw':
        case 'createGzip':
        case 'createGunzip':
        case 'createUnzip':
        case 'createBrotliCompress':
        case 'createBrotliDecompress':
            return ['ro'];
        default:
            console.log('Zlib ' + function_name)
            return []
    }
}

function typeZlibTransformInterface(function_name: string){
    switch (function_name) {
        case 'close':
        case 'flush':
        case 'params':
            return ['cb'];
        default:
            return typeStreamTransform(function_name)
    }
}

export function chooseZlib(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'zlib': 
            types_returns = typeZlib(function_name);
            break;
        case 'ZlibTransformInterface': 
            types_returns = typeZlibTransformInterface(function_name);
            break;
        default: 
            console.log('zlib not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}