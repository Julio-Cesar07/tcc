import { typeEventEmitter } from "./event-emitter";

function typeFs(function_name: string){
    switch (function_name) {
        case 'appendFile':
        case 'access':
        case 'chown':
        case 'chmod':
        case 'close':
        case 'copyFile':
        case 'exists':
        case 'fchown':
        case 'fchmod':
        case 'fdatasync':
        case 'fstat':
        case 'fsync':
        case 'ftruncate':
        case 'futimes':
        case 'lchown':
        case 'link':
        case 'lchmod':
        case 'lstat':
        case 'mkdir':
        case 'mkdtemp':
        case 'open':
        case 'readdir':
        case 'read':
        case 'readFile':
        case 'readlink':
        case 'realpath':
        case 'rename':
        case 'rmdir':
        case 'stat':
        case 'symlink':
        case 'truncate':
        case 'unlink':
        case 'utimes':
        case 'watchFile':
        case 'writeFile':
        case 'write':
            return ['cb']
        case 'createReadStream':
        case 'createWriteStream':
            return ['ro'];
        case 'watch':
            return ['cb', 'ro'];
        case 'promises': 
            return ['op']
        default:
            console.log('Fs ' + function_name)
            return []
    }
}

function typeFsPromises(function_name: string){
    switch (function_name) {
        case 'access':
        case 'copyFile':
        case 'open':
        case 'rename':
        case 'truncate':
        case 'rmdir':
        case 'mkdir':
        case 'readdir':
        case 'readlink':
        case 'symlink':
        case 'lstat':
        case 'stat':
        case 'link':
        case 'unlink':
        case 'chmod':
        case 'lchmod':
        case 'lchown':
        case 'chown':
        case 'utimes':
        case 'realpath':
        case 'mkdtemp':
        case 'writeFile':
        case 'appendFile':
        case 'readFile':
            return ['rp']
        default:
            console.log('FsPromises ' + function_name)
            return []
    }
}

function typeFSWatcher(function_name: string){
    switch (function_name) {
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseFs(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'fs.Promises': 
            types_returns = typeFsPromises(function_name);
            break;
        case 'fs': 
            types_returns = typeFs(function_name);
            break;
        case 'fs.FSWatcher': 
            types_returns = typeFSWatcher(function_name);
            break;
        default: 
            console.log('fs not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}