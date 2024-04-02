const sqlite = require('sqlite3').verbose();
const db =new sqlite.Database("./construction_infos.db", sqlite.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err);
});

const sql =`CREATE TABLE projects(ID INTEGER PRIMARY KEY, name, start, finish, layername, model)`
db.run(sql);