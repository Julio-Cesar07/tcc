import { typeEventEmitter } from "./event-emitter"

function typeCluster(function_name: string) {
    switch (function_name) {
        case 'fork':
            return ['ro']
        case 'disconnect':
            return ['cb']
        case 'worker':
            return ['op']
        default:
            return typeEventEmitter(function_name)
    }
}

function typeClusterWorker(function_name: string) {
    switch (function_name) {
        case 'send':
            return ['cb']
        case 'process':
            return ['ob']
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseCluster(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'cluster': 
            types_returns = typeCluster(function_name);
            break;
        case 'cluster.Worker': 
            types_returns = typeClusterWorker(function_name);
            break;
        default: 
            console.log('cluster not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}