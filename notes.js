const sqlite = require('sqlite3').verbose();
const db =new sqlite.Database("./construction_infos.db", sqlite.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err);
});

const sql =`CREATE TABLE notes(ID INTEGER PRIMARY KEY, user_id, title, text, object, project_id, position)` //FOREIGN KEY (user_id) REFERENCES users (id),FOREIGN KEY (project_id) REFERENCES projects (id))`
db.run(sql);