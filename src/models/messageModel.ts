import {Conect} from '../types/conec'

const Message  = {
    get: (con:Conect, callback:any) => {
        con.query(`SELECT messageType,fileUrl,content, messages.id as id, userid, date, firstName,lastName FROM messages INNER JOIN users ON messages.userId = users.id ORDER BY date`, callback)
    },

    getById: (con:Conect, id:string,callback:any) => {
        con.query(`SELECT * FROM messages WHERE id = ${id} `, callback)
    },
    destroy: (con:Conect, id:string,callback:any) => {
        con.query(`DELETE FROM messages WHERE id = ${id} `, callback)
    },
    create: (con:Conect, data:any,callback:any) => {
       
        con.query(`INSERT INTO messages SET 
        content = '${data.content}',
        userId = '${data.userid}',
        messageType = '${data.messageType}',
        fileUrl = ''
         `, callback)
    },
}
export default Message;
