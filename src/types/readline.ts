import { typeEventEmitter } from "./event-emitter";

function typeReadline(function_name: string){
    switch (function_name) {
        case 'clearLine':
        case 'clearScreenDown':
        case 'cursorTo':
        case 'moveCursor':
            return ['cb'];
        case 'createInterface':
            return ['ro'];
        default:
            console.log('Readline ' + function_name)
            return []
    }
}

export function typeReadlineInterface(function_name: string){
    switch (function_name) {
        case 'question':
            return ['cb'];
        default:
            return typeEventEmitter(function_name)
    }
}

export function chooseReadline(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'readline': 
            types_returns = typeReadline(function_name);
            break;
        case 'readline.Interface': 
            types_returns = typeReadlineInterface(function_name);
            break;
        default: 
            console.log('readline not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}