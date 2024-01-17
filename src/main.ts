import fs, { promises as fsPromises } from 'node:fs'
import path from 'node:path'
import * as fastcsv from 'fast-csv'
import { chooseFs } from './types/fs';
import { chooseChildProcess } from './types/child_process';
import { chooseCluster } from './types/cluster';
import { chooseCrypto } from './types/crypto';
import { chooseDgram } from './types/dgram';
import { chooseDns } from './types/dns';
import { chooseEventEmitter } from './types/event-emitter';
import { chooseHttp } from './types/http';
import { chooseHttp2 } from './types/http2';
import { chooseHttps } from './types/https';
import { chooseNet } from './types/net';
import { chooseProcess } from './types/process';
import { chooseRepl } from './types/repl';
import { chooseStream } from './types/stream';
import { chooseTls } from './types/tls';
import { chooseUtil } from './types/util';
import { chooseZlib } from './types/zlib';
import { chooseReadline } from './types/readline';
import { handleFunctions } from './handle-function';

type DataFormat = {
    project_name: string;
    total_quantity: number;
    child_process: number;
    cluster: number;
    crypto: number;
    dgram: number;
    dns: number;
    eventEmitter: number;
    fs: number;
    http: number;
    http2: number;
    https: number;
    net: number;
    process: number;
    readline: number;
    repl: number;
    stream: number;
    tls: number;
    util: number;
    zlib: number;
    cb: number;
    ro: number;
    oc: number;
    op: number;
    co: number;
    rp: number;
    dd: number;
}

// const data_to_save: DataFormat[] = []

const data_not_mapped: {
    operation?: string | null | string[];
    object?: string | null
}[] = []

type DataFormatAux = Omit<DataFormat, 'project_name'> & {
    [key: string]: number
}

function initDataFormat(): DataFormatAux{
    const data_aux: Omit<DataFormat, 'project_name'> = {
        total_quantity: 0,
        child_process: 0,
        cluster: 0,
        crypto: 0,
        dgram: 0,
        dns: 0,
        eventEmitter: 0,
        fs: 0,
        http: 0,
        http2: 0,
        https: 0,
        net: 0,
        process: 0,
        readline: 0,
        repl: 0,
        stream: 0,
        tls: 0,
        util: 0,
        zlib: 0,
        cb: 0,
        co: 0,
        oc: 0,
        op: 0,
        ro: 0,
        rp: 0,
        dd: 0
    }

    return data_aux
}

function defineModule(module_name: string, function_name: string){
    const module_name_lower_case = module_name.toLowerCase()
    if(module_name_lower_case.startsWith('fs'))
        return chooseFs(module_name, function_name)
    if(module_name_lower_case.startsWith('readstream') || module_name_lower_case.startsWith('writestream'))
        return chooseFs('fs', module_name_lower_case === 'readstream' ? 'createReadStream' : 'createWriteStream')
    else if(module_name_lower_case.startsWith('child_process') || module_name_lower_case.startsWith('childprocess'))
        return chooseChildProcess(module_name, function_name)
    else if(module_name_lower_case.startsWith('cluster'))
        return chooseCluster(module_name, function_name)
    else if(module_name_lower_case.startsWith('crypto'))
        return chooseCrypto(module_name, function_name)
    else if(module_name_lower_case.startsWith('dgram'))
        return chooseDgram(module_name, function_name)
    else if(module_name_lower_case.startsWith('dns'))
        return chooseDns(module_name, function_name)
    else if(module_name_lower_case.startsWith('EventEmitter'))
        return chooseEventEmitter(module_name, function_name)
    else if(module_name_lower_case.startsWith('http2'))
        return chooseHttp2(module_name, function_name)
    else if(module_name_lower_case.startsWith('https'))
        return chooseHttps(module_name, function_name)
    else if(module_name_lower_case.startsWith('http'))
        return chooseHttp(module_name, function_name)
    else if(module_name_lower_case.startsWith('net'))
        return chooseNet(module_name, function_name)
    else if(module_name_lower_case.startsWith('process'))
        return chooseProcess(module_name, function_name)
    else if(module_name_lower_case.startsWith('readline'))
        return chooseReadline(module_name, function_name)
    else if(module_name_lower_case.startsWith('repl'))
        return chooseRepl(module_name, function_name)
    else if(module_name_lower_case.startsWith('tls'))
        return chooseTls(module_name, function_name)
    else if(module_name_lower_case.startsWith('util'))
        return chooseUtil(module_name, function_name)
    else if(module_name_lower_case.startsWith('zlib'))
        return chooseZlib(module_name, function_name)
    else if(module_name_lower_case.startsWith('stream'))
        return chooseStream(module_name, function_name)
    else{
        if(module_name_lower_case !== "promisify")
            console.log('DEU RUIM AQUI ' + module_name)
        return []
    }
}

// cb 53146
// ro 1954

async function process_files(pathFile: string): Promise<Omit<DataFormat, 'project_name'>> {
    const data_aux = initDataFormat()

    try {
        const data = await fsPromises.readFile(pathFile, 'utf-8');

        const logs: {
            object?: string | null,
            operation?: string | string[]
            function?: string
        }[] = JSON.parse(data)

        if(!Array.isArray(logs)){
             console.error("Erro, arquivo não é um array")
            return data_aux
        }

        logs.forEach(log => {

            if(!log.operation || log.operation === 'callback run' || log.operation === 'promise run'){
                return 
            }
            
            data_aux.total_quantity++;
            const key = log.object ? log.object.split('.', 1)[0].toLowerCase() : "";
            
            if (key in data_aux) {
                data_aux[key]++;
            } else if(key === 'writestream' || key === 'readstream'){
                data_aux.fs++;
            } else if(key === 'zlibtransforminterface'){
                data_aux.zlib++;
            } else if(key === 'childprocess'){
                data_aux.child_process++;
            } else if(key === 'promisify'){
                data_aux.util++;
            }
            else {
                if(log.operation !== 'direct delay')
                    data_not_mapped.push({
                        object: log.object,
                        operation: log.operation
                    })   
                else {
                    data_aux.dd++;
                }
            }

            if(log.function && log.object)
                defineModule(log.object, log.function).forEach(item => {
                    data_aux[item]++;
            })
        })

        return data_aux;
    } catch (error) {
        console.error(`Erro ao ler arquivo ${pathFile}: `, error)
        return data_aux
    }
    
}

async function process_dir(pathDir: string, project_name: string){
    console.log(`começando ${project_name}`)
    const data_aux: DataFormat = {
        project_name,
        ...initDataFormat()
    }

    try {
        const files = await fsPromises.readdir(pathDir);   
        const promises_process_files = files.map<Promise<Omit<DataFormat, 'project_name'>>>(async file => {
            if(file.startsWith('nacd-never')){
                const pathFile = path.join(pathDir, file)
    
                return process_files(pathFile)
            }
            throw new Error('files not is nacd-never')
        })

        const aux = await Promise.all(promises_process_files)

        data_aux.total_quantity = aux.reduce((total, currentValue) => total + currentValue.total_quantity, 0)
        data_aux.child_process = aux.reduce((total, currentValue) => total + currentValue.child_process, 0)
        data_aux.cluster = aux.reduce((total, currentValue) => total + currentValue.cluster, 0)
        data_aux.crypto = aux.reduce((total, currentValue) => total + currentValue.crypto, 0)
        data_aux.dgram = aux.reduce((total, currentValue) => total + currentValue.dgram, 0)
        data_aux.dns = aux.reduce((total, currentValue) => total + currentValue.dns, 0)
        data_aux.eventEmitter = aux.reduce((total, currentValue) => total + currentValue.eventEmitter, 0)
        data_aux.fs = aux.reduce((total, currentValue) => total + currentValue.fs, 0)
        data_aux.http = aux.reduce((total, currentValue) => total + currentValue.http, 0)
        data_aux.http2 = aux.reduce((total, currentValue) => total + currentValue.http2, 0)
        data_aux.https = aux.reduce((total, currentValue) => total + currentValue.https, 0)
        data_aux.net = aux.reduce((total, currentValue) => total + currentValue.net, 0)
        data_aux.process = aux.reduce((total, currentValue) => total + currentValue.process, 0)
        data_aux.readline = aux.reduce((total, currentValue) => total + currentValue.readline, 0)
        data_aux.repl = aux.reduce((total, currentValue) => total + currentValue.repl, 0)
        data_aux.stream = aux.reduce((total, currentValue) => total + currentValue.stream, 0)
        data_aux.tls = aux.reduce((total, currentValue) => total + currentValue.tls, 0)
        data_aux.util = aux.reduce((total, currentValue) => total + currentValue.util, 0)
        data_aux.zlib = aux.reduce((total, currentValue) => total + currentValue.zlib, 0)

        data_aux.cb = aux.reduce((total, currentValue) => total + currentValue.cb, 0)
        data_aux.co = aux.reduce((total, currentValue) => total + currentValue.co, 0)
        data_aux.oc = aux.reduce((total, currentValue) => total + currentValue.oc, 0)
        data_aux.op = aux.reduce((total, currentValue) => total + currentValue.op, 0)
        data_aux.ro = aux.reduce((total, currentValue) => total + currentValue.ro, 0)
        data_aux.rp = aux.reduce((total, currentValue) => total + currentValue.rp, 0)
        data_aux.dd = aux.reduce((total, currentValue) => total + currentValue.dd, 0)

        const file_csv = fs.createWriteStream(path.join(__dirname, `../data/data.csv`), { flags: 'a'})
        const headers = ['project_name', 'total_quantity', 'child_process', 'cluster',
        'crypto', 'dgram', 'dns', 'eventEmitter', 'fs', 'http', 'http2', 'https', 'net',
        'process', 'readline', 'repl', 'stream', 'tls', 'util', 'zlib',
        'cb', 'ro', 'oc', 'op', 'co', 'rp', 'dd']

        fastcsv.write([data_aux], { headers, includeEndRowDelimiter: true, writeHeaders: false }).pipe(file_csv)

        return;
    } catch (error) {
        console.error(`Erro ao ler diretório ${pathDir}: `, error)
        return;
    }
}

async function main(){
    // /home/julio/tcc
    const pathDir = '/mnt/d/TCC/nacd' 
    const pathDirs = path.join(pathDir);

    try {
        const dirs = await fsPromises.readdir(pathDirs)

        // Escrevendo os headers
        const file_csv = fs.createWriteStream(path.join(__dirname, `../data/data.csv`))
        const headers = ['project_name', 'total_quantity', 'child_process', 'cluster',
        'crypto', 'dgram', 'dns', 'eventEmitter', 'fs', 'http', 'http2', 'https', 'net',
        'process', 'readline', 'repl', 'stream', 'tls', 'util', 'zlib',
        'cb', 'ro', 'oc', 'op', 'co', 'rp', 'dd']

        fastcsv.write([headers], { headers: true, includeEndRowDelimiter: true, writeHeaders: false}).pipe(file_csv)

        // const process_dirs_promises = dirs.map(async (dir) => {
        //     const pathDir = path.join(pathDirs, dir, 'logs/npm__test')

        //     return process_dir(pathDir, dir)
        // })

        // await Promise.all(process_dirs_promises)

        for(const dir of dirs){
            const pathDir = path.join(pathDirs, dir, 'logs/npm__test')

            await process_dir(pathDir, dir)
        }

        data_not_mapped.forEach(item => console.log(item))

        console.log('\n\nlidando com as funções\n\n')

        await handleFunctions(pathDir);

        return;
    } catch (error) {
        if(error){
            console.error("Erro ao ler diretório: ", error)
            return;
        }
    }

}

main()