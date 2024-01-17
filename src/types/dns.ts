function typeDns(function_name: string){
    switch (function_name) {
        case 'lookup':
        case 'lookupService':
            return ['cb'];
        case 'Resolver':
            return ['oc'];
        case 'promises': 
            return ['op']
        default:
            return typeDnsResolver(function_name)
    }
}

function typeDnsResolver(function_name: string){
    switch (function_name) {
        case 'resolve':
        case 'resolveAny':
        case 'resolve4':
        case 'resolve6':
        case 'resolveCname':
        case 'resolveMx':
        case 'resolveNs':
        case 'resolveTxt':
        case 'resolveSrv':
        case 'resolvePtr':
        case 'resolveNaptr':
        case 'resolveSoa':
        case 'reverse':
            return ['cb'];
        default:
            console.log('DnsResolver ' + function_name)
            return []
    }
}

function typeDnsPromises(function_name: string){
    switch (function_name) {
        case 'lookup':
        case 'lookupService':
            return ['rp'];
        case 'Resolver':
            return ['oc']
        default:
            return typeDnsPromiseResolver(function_name)
    }
}

function typeDnsPromiseResolver(function_name: string){
    switch (function_name) {
        case 'resolve':
        case 'resolveAny':
        case 'resolve4':
        case 'resolve6':
        case 'resolveCname':
        case 'resolveMx':
        case 'resolveNs':
        case 'resolveTxt':
        case 'resolveSrv':
        case 'resolvePtr':
        case 'resolveNaptr':
        case 'resolveSoa':
        case 'reverse':
            return ['rp'];
        default:
            console.log('DnsPromiseResolver ' + function_name)
            return []
    }
}

export function chooseDns(module_name: string, function_name: string) {
    let types_returns: string[] = []

    switch (module_name) {
        case 'dns': 
            types_returns = typeDns(function_name);
            break;
        case 'dns.Resolver': 
            types_returns = typeDnsResolver(function_name);
            break;
        case 'dns.Promises':
            types_returns = typeDnsPromises(function_name);
            break;
        case 'dns.PromiseResolver':
            types_returns = typeDnsPromiseResolver(function_name);
            break;
        default: 
            console.log('dns not found')
            console.log(module_name + " " + function_name)
    }

    return types_returns
}