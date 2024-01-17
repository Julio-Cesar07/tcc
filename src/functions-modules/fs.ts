export interface FsFunctions {
    appendFile: number;
    access: number;
    chown: number;
    chmod: number;
    close: number;
    copyFile: number;
    exists: number;
    fchown: number;
    fchmod: number;
    fdatasync: number;
    fstat: number;
    fsync: number;
    ftruncate: number;
    futimes: number;
    lchown: number;
    link: number;
    lchmod: number;
    lstat: number;
    mkdir: number;
    mkdtemp: number;
    open: number;
    readdir: number;
    read: number;
    readFile: number;
    readlink: number;
    realpath: number;
    rename: number;
    rmdir: number;
    stat: number;
    symlink: number;
    truncate: number;
    unlink: number;
    utimes: number;
    watchFile: number;
    writeFile: number;
    write: number;
    createReadStream: number;
    createWriteStream: number;
    watch: number;
    promises: number;
}

export interface FsPromisesFunctions {
    access: number;
    copyFile: number;
    open: number;
    rename: number;
    truncate: number;
    rmdir: number;
    mkdir: number;
    readdir: number;
    readlink: number;
    symlink: number;
    lstat: number;
    stat: number;
    link: number;
    unlink: number;
    chmod: number;
    lchmod: number;
    lchown: number;
    chown: number;
    utimes: number;
    realpath: number;
    mkdtemp: number;
    writeFile: number;
    appendFile: number;
    readFile: number;
}