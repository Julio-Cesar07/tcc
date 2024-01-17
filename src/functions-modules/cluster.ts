export interface ClusterFunctions {
    fork: number;
    disconnect: number;
    worker: number;
}

export interface ClusterWorkerFunction {
    send: number;
    process: number;
}