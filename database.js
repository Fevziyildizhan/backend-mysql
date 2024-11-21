import mysql from "mysql2"

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crud_app',
  }).promise()


export async function getCrud (id) {
    const [rows] = await pool.query(`select * from crud where id = ?`,[id])
    return rows
}


export async function getCruds () {
    const [rows] = await pool.query("select * from crud")
    return rows

}

export async function createCrud(title, content) {
    const [result] = await pool.query(
        `INSERT INTO crud (title, contents) VALUES (?, ?)`, 
        [title, content]
    );
    return {
        id: result.insertId,
        title,
        content,
    };
}

export async function updateCrud(id, title, content) {
    const [result] = await pool.query(
      `UPDATE crud SET title = ?, contents = ? WHERE id = ?`,
      [title, content, id]
    );
    return result.affectedRows > 0;
  }


  export async function deleteCrud(id) {
    const [result] = await pool.query(
      `DELETE FROM crud WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0; 
  }



