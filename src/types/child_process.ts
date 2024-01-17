import { typeEventEmitter } from "./event-emitter"

function typeChild_process(function_name: string){
    switch (function_name) {
        case 'fork':
        case 'spawn':
            return ['ro']
        case 'exec':
        case 'execFile':
            return ['cb', 'ro']
        default: 
            console.log('child_process' + ' ' + function_name)
            return []
    }
}

function typeChildProcess(function_name: string) {
    switch (function_name){
        case 'send':
            return ['cb']
        case 'stderr':
        case 'stdin':
        case 'stdout':
            return ['op']
        default: 
            return typeEventEmitter(function_name)
    }
}

export function chooseChildProcess(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'child_process': 
            types_returns = typeChild_process(function_name);
            break;
        case 'ChildProcess': 
            types_returns = typeChildProcess(function_name);
            break;
        default: 
            console.log('child_process not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}