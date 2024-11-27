import mysql from "mysql2"

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crud_app',
  }).promise()


export async function getCrud (id) {
    try{
        const [rows] = await pool.query(`select * from crud where id = ?`,[id])
        return rows

    }catch(error){
        console.log(error)
    }
}


export async function getCruds () {
    try{
        const [rows] = await pool.query("select * from crud")
        return rows
    }catch(error){
        console.log(error)
    }

}

export async function createCrud(title, content) {
    try{
        const [result] = await pool.query(
            `INSERT INTO crud (title, contents) VALUES (?, ?)`, 
            [title, content]
        );
        return {
            id: result.insertId,
            title,
            content,
        };
    }catch(error){
        console.log(error)
    }
}

export async function updateCrud(id, title, content) {
    try{
        const [result] = await pool.query(
          `UPDATE crud SET title = ?, contents = ? WHERE id = ?`,
          [title, content, id]
        );
        return result.affectedRows ;
    }catch(error){
        console.log(error)
    }
  }


  export async function deleteCrud(id) {
    try{
        const [result] = await pool.query(
          `DELETE FROM crud WHERE id = ?`,
          [id]
        );
        return result.affectedRows ; 
    }catch(error){
        console.log(error)
    }

  }



