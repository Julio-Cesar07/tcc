export interface Child_processFunctions {
    fork: number;
    spawn: number;
    exec: number;
    execFile: number;
}

export interface ChildProcess {
    send: number;
    stderr: number;
    stdin: number;
    stdout: number;
}