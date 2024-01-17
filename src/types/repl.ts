import { typeReadlineInterface } from "./readline";

function typeRepl(function_name: string){
    switch (function_name) {
        case 'start':
            return ['ro'];
        case 'REPLServer':
            return ['oc', 'ro'];
        default:
            console.log('Repl ' + function_name)
            return []
    }
}

function typeReplServer(function_name: string){
    switch (function_name) {
        case 'setupHistory':
            return ['cb'];
        default:
            return typeReadlineInterface(function_name)
    }
}

export function chooseRepl(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'repl': 
            types_returns = typeRepl(function_name);
            break;
        case 'repl.REPLServer': 
            types_returns = typeReplServer(function_name);
            break;
        default: 
            console.log('repl not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}