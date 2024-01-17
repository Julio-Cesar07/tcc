import fs, { promises as fsPromises } from 'node:fs'
import path from 'node:path'
import * as fastcsv from 'fast-csv'

interface ModuleFunctions {
    [key: string]: {
        total_quantity: number
        times_used: number
    };
}

const childProcessFunctions: ModuleFunctions = {}
const clusterFunctions: ModuleFunctions = {}
const cryptoFunctions: ModuleFunctions = {}
const dgramFunctions: ModuleFunctions = {}
const dnsFunctions: ModuleFunctions = {}
const eventEmitterFunctions: ModuleFunctions = {}
const fsFunctions: ModuleFunctions = {}
const httpFunctions: ModuleFunctions = {}
const http2Functions: ModuleFunctions = {}
const httpsFunctions: ModuleFunctions = {}
const netFunctions: ModuleFunctions = {}
const processFunctions: ModuleFunctions = {}
const readlineFunctions: ModuleFunctions = {}
const replFunctions: ModuleFunctions = {}
const streamFunctions: ModuleFunctions = {}
const tlsFunctions: ModuleFunctions = {}
const utilFunctions: ModuleFunctions = {}
const zlibFunctions: ModuleFunctions = {}

interface modules_functions {
    module_name: string;
    function_name: string;
}

let modules_functions_in_project: modules_functions[] = []

function reset_modules_functions() {
    modules_functions_in_project = []
}

function add_module_functions(function_name: string, module_name: string){
    const module_name_replace = module_name.replace('_', '')
    const positionIndex = modules_functions_in_project.findIndex(item => item.function_name === function_name && item.module_name === module_name_replace)

    if(positionIndex >= 0) return;

    modules_functions_in_project.push({
        function_name,
        module_name: module_name_replace
    })
}

function handle_module_functions() {
    modules_functions_in_project.forEach(item => {
        const module_name_lower_case = item.module_name.toLowerCase()
        const function_name = item.function_name

        if(module_name_lower_case.startsWith('fs')) 
            fsFunctions[function_name] !== undefined ? fsFunctions[function_name].times_used++ : fsFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('child_process') || module_name_lower_case.startsWith('childprocess'))
            childProcessFunctions[function_name] !== undefined ? childProcessFunctions[function_name].times_used++ : childProcessFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('cluster'))
            clusterFunctions[function_name] !== undefined ? clusterFunctions[function_name].times_used++ : clusterFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('crypto'))
            cryptoFunctions[function_name] !== undefined ? cryptoFunctions[function_name].times_used++ : cryptoFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('dgram'))
            dgramFunctions[function_name] !== undefined ? dgramFunctions[function_name].times_used++ : dgramFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('dns'))
            dnsFunctions[function_name] !== undefined ? dnsFunctions[function_name].times_used++ : dnsFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('EventEmitter'))
            eventEmitterFunctions[function_name] !== undefined ? eventEmitterFunctions[function_name].times_used++ : eventEmitterFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('http2'))
            http2Functions[function_name] !== undefined ? http2Functions[function_name].times_used++ : http2Functions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('https'))
            httpsFunctions[function_name] !== undefined ? httpsFunctions[function_name].times_used++ : httpsFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('http'))
            httpFunctions[function_name] !== undefined ? httpFunctions[function_name].times_used++ : httpFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('net'))
            netFunctions[function_name] !== undefined ? netFunctions[function_name].times_used++ : netFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('process'))
            processFunctions[function_name] !== undefined ? processFunctions[function_name].times_used++ : processFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('readline'))
            readlineFunctions[function_name] !== undefined ? readlineFunctions[function_name].times_used++ : readlineFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('repl'))
            replFunctions[function_name] !== undefined ? replFunctions[function_name].times_used++ : replFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('tls'))
            tlsFunctions[function_name] !== undefined ? tlsFunctions[function_name].times_used++ : tlsFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('util'))
            utilFunctions[function_name] !== undefined ? utilFunctions[function_name].times_used++ : utilFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('zlib'))
            zlibFunctions[function_name] !== undefined ? zlibFunctions[function_name].times_used++ : zlibFunctions[function_name].times_used = 0;
        else if(module_name_lower_case.startsWith('stream'))
            streamFunctions[function_name] !== undefined ? streamFunctions[function_name].times_used++ : streamFunctions[function_name].times_used = 0;
        else{
            console.log('deu ruim aqui na hora de associar ', module_name_lower_case + ' ' + function_name)
        }
    })
}

function defineModule(module_name: string, function_name: string){
    const module_name_lower_case = module_name.toLowerCase()
    if(module_name_lower_case.startsWith('fs')) 
        fsFunctions[function_name] !== undefined ? fsFunctions[function_name].total_quantity++ : fsFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('child_process') || module_name_lower_case.startsWith('childprocess'))
        childProcessFunctions[function_name] !== undefined ? childProcessFunctions[function_name].total_quantity++ : childProcessFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('cluster'))
        clusterFunctions[function_name] !== undefined ? clusterFunctions[function_name].total_quantity++ : clusterFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('crypto'))
        cryptoFunctions[function_name] !== undefined ? cryptoFunctions[function_name].total_quantity++ : cryptoFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('dgram'))
        dgramFunctions[function_name] !== undefined ? dgramFunctions[function_name].total_quantity++ : dgramFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('dns'))
        dnsFunctions[function_name] !== undefined ? dnsFunctions[function_name].total_quantity++ : dnsFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('EventEmitter'))
        eventEmitterFunctions[function_name] !== undefined ? eventEmitterFunctions[function_name].total_quantity++ : eventEmitterFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('http2'))
        http2Functions[function_name] !== undefined ? http2Functions[function_name].total_quantity++ : http2Functions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('https'))
        httpsFunctions[function_name] !== undefined ? httpsFunctions[function_name].total_quantity++ : httpsFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('http'))
        httpFunctions[function_name] !== undefined ? httpFunctions[function_name].total_quantity++ : httpFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('net'))
        netFunctions[function_name] !== undefined ? netFunctions[function_name].total_quantity++ : netFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('process'))
        processFunctions[function_name] !== undefined ? processFunctions[function_name].total_quantity++ : processFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('readline'))
        readlineFunctions[function_name] !== undefined ? readlineFunctions[function_name].total_quantity++ : readlineFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('repl'))
        replFunctions[function_name] !== undefined ? replFunctions[function_name].total_quantity++ : replFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('tls'))
        tlsFunctions[function_name] !== undefined ? tlsFunctions[function_name].total_quantity++ : tlsFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('util'))
        utilFunctions[function_name] !== undefined ? utilFunctions[function_name].total_quantity++ : utilFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('zlib'))
        zlibFunctions[function_name] !== undefined ? zlibFunctions[function_name].total_quantity++ : zlibFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else if(module_name_lower_case.startsWith('stream'))
        streamFunctions[function_name] !== undefined ? streamFunctions[function_name].total_quantity++ : streamFunctions[function_name] = { times_used: 0, total_quantity: 1};
    else{
        console.log('deu ruim aqui ', module_name + ' ' + function_name)
    }

    add_module_functions(function_name, module_name_lower_case)
}

async function process_files(pathFile: string) {
    try {
        const data = await fsPromises.readFile(pathFile, 'utf-8');

        const logs: {
            object?: string | null,
            operation?: string | string[]
            function?: string
        }[] = JSON.parse(data)

        if(!Array.isArray(logs)){
            return;
        }

        logs.forEach(log => {

            if(!log.operation || log.operation === 'callback run' || log.operation === 'promise run'){
                return 
            }
            
            const key = log.object ? log.object.split('.', 1)[0].toLowerCase() : "";
            
            if(key === 'writestream' || key === 'readstream'){
                defineModule('fs', key)
            } else if(key === 'zlibtransforminterface'){
                defineModule('zlib', key)
            } else if(key === 'childprocess'){
                defineModule('childprocess', key)
            } else if(key === 'promisify'){
                defineModule('util', key)
            } else if(log.object && log.function) {
                defineModule(key, log.function)
            } else {
                if(log.operation !== 'direct delay')
                    console.log("AQUI " + log.operation)
            }
        })

        return;
    } catch (error) {
        console.error(`Erro ao ler arquivo ${pathFile}: `, error)
        return;
    }
    
}

async function process_dir(pathDir: string, project_name: string){
    console.log(project_name)
    try {
        const files = await fsPromises.readdir(pathDir);   
        const promises_process_files = files.map(async file => {
            if(file.startsWith('nacd-never')){
                const pathFile = path.join(pathDir, file)
    
                return process_files(pathFile)
            }
        })

        await Promise.all(promises_process_files)


        handle_module_functions();
        reset_modules_functions();

        return;
    } catch (error) {
        console.error(`Erro ao ler diretório ${pathDir}: `, error)
        return;
    }
}

function handleData(module_functions: ModuleFunctions, module_name: string) {
    const file_csv = fs.createWriteStream(path.join(__dirname, `../data/data-functions.csv`), { flags: 'a'})

    const headers = ['module_name', 'function_name', 'total_quantity', 'times_used']

    const itemsToSave = Object.keys(module_functions).map(item => {
        const module_functions_with_name = {
            module_name,
            function_name: item,
            total_quantity: module_functions[item].total_quantity ?? 0,
            times_used: module_functions[item].times_used ?? 0
        }

        return module_functions_with_name
    })


    fastcsv.write(itemsToSave, { headers, includeEndRowDelimiter: true, writeHeaders: false }).pipe(file_csv)
}

export async function handleFunctions(pathDir: string) {
    const pathDirs = path.join(pathDir);

    try {
        const dirs = await fsPromises.readdir(pathDirs)

        for(const dir of dirs){
            const pathDir = path.join(pathDirs, dir, 'logs/npm__test')

            await process_dir(pathDir, dir)
        }     
        
        const modules = [{ module_name: 'fs', functions: fsFunctions }, 
        { module_name: 'crypto', functions: cryptoFunctions }, { module_name: 'child_process', functions: childProcessFunctions},
        { module_name: 'cluster', functions: clusterFunctions},
        { module_name: 'dgram', functions: dgramFunctions}, { module_name: 'dns', functions: dnsFunctions}, 
        { module_name: 'event-emitter', functions: eventEmitterFunctions}, { module_name: 'http', functions: httpFunctions}, 
        { module_name: 'http2', functions: http2Functions}, { module_name: 'https', functions: httpsFunctions}, { module_name: 'net', functions: netFunctions},
        { module_name: 'process', functions: processFunctions}, { module_name: 'readline', functions: readlineFunctions}, { module_name: 'repl', functions: replFunctions}, 
        { module_name: 'stream', functions: streamFunctions}, { module_name: 'tls', functions: tlsFunctions}, { module_name: 'util', functions: utilFunctions}, 
        { module_name: 'zlib', functions: zlibFunctions}]

        const file_csv = fs.createWriteStream(path.join(__dirname, `../data/data-functions.csv`))

        const headers = ['module_name', 'function_name', 'total_quantity', 'times_used']
        fastcsv.write([headers], { headers, includeEndRowDelimiter: true, writeHeaders: false }).pipe(file_csv)

        modules.forEach(item => Object.keys(item.functions).length !== 0 ? handleData(item.functions, item.module_name) : undefined)

        modules.forEach(item => {
            console.log(item.module_name)
            console.log(item.functions)
        })
    } catch (error) {
        console.error("Erro ao ler diretório: ", error)
        return;
    }
}