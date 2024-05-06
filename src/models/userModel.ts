const { hashPassword } = require("../utils/auth")
import {Conect,User} from '../types/conec'
const UserModel = {
    get: (con:Conect, callback:any) => {
        con.query('SELECT * FROM users', callback)
    },

    getById: (con:Conect, id:any,callback:any) => {
        con.query(`SELECT * FROM users WHERE id = ${id} `, callback)
    },
    getByEmail: (con:Conect, email:any,callback:any) => {
        con.query(`SELECT * FROM users WHERE email = '${email}' `, callback)
    },
    create: (con:Conect, data:User,callback:any) => {
        con.query(`INSERT INTO users SET 
        firstName = '${data.firstName}',
        lastName = '${data.lastName}',
        email = '${data.email.toLowerCase()}',
        password = '${hashPassword(data.password)}',
        roleId = '${typeof data.role !== 'undefined' ? data.role : 2}',
        img = '${data.img}',
        active =  '${typeof data.active !== 'undefined' ? data.active : 1}}'
         `, callback)
    },
}
export default UserModel