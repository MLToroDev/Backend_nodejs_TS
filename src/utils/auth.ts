
import bcrypt from 'bcryptjs';

import * as fs from 'fs';

function hashPassword(password:string) {

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function getFilePath(file:any) {

    const path = file.path.split('\\')
    const filename = path.pop()
    const folder = path.pop()
    return `${folder}/${filename}`
}

function unlinkFile(path:any) {
    try {
        if (!path) throw new Error('No hay imagen');
        fs.unlinkSync('src/upload/'+path)
    } catch (error) { console.log(error) }
}

export { hashPassword, getFilePath,unlinkFile }