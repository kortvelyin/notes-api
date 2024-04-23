const express = require ("express");
const bodyParser= require("body-parser");
const res =require("express/lib/response");
const app =express();
const sqlite = require('sqlite3').verbose();

const db =new sqlite.Database("./construction_infos.db", sqlite.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err);
});

app.use(bodyParser.json());

//post request
app.post("/notes", (req, res) =>{
    try {
        const{user_id, title, text,object,project_id,position}= req.body;
        sql ="INSERT INTO notes(user_id, title, text,object,project_id,position ) VALUES (?,?,?,?,?,?)";
        db.run(sql, [user_id, title, text,object,project_id,position], (err)=> {
            if (err) return res.json({ status:300, success:false, error:err});
            console.log("seccessful input",user_id, title, text,object,project_id,position);
        });
        return res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

//put request//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put("/notes/:id", (req, res) =>{
    const { id } = req.params;
    const{user_id, title, text, object, project_id, position}= req.body;
    db.run(`UPDATE notes SET user_id = ?, title = ?, text = ?, object = ?, project_id = ?, position = ? WHERE id = ?`,
        [user_id, title, text, object, project_id, position, id],
         (err)=> {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});
//get by id request
app.get("/notes/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM notes where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});


//get request
app.get("/notes/byproject/:project_id", (req, res)=>{
    sql=`SELECT * FROM notes where project_id = ?`;
    try{
        db.all(sql, [req.params.project_id], (err, rows)=>{
            if (err) return res.json({ status:300, success:false, error:err});

            if(rows.length<1)
                return res.json({ status:300, success:false, error:"No match"});

            return res.json({status: 200, data: rows, success: true});


        });
        
    }catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

//get request
app.get("/notes", (req, res)=>{
    sql=`SELECT * FROM notes`;
    try{
        db.all(sql, [], (err, rows)=>{
            if (err) return res.json({ status:300, success:false, error:err});

            if(rows.length<1)
                return res.json({ status:300, success:false, error:"No match"});

            return res.json({status: 200, data: rows, success: true});


        });
        
    }catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})



//delete equest 
app.delete("/notes/:id", (req, res, next) => {
    db.run(`DELETE FROM notes WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});






///users
//post request
app.post("/users", (req, res) =>{
    try {
        const{ name, company, job, title,pose}= req.body;
        sql ="INSERT INTO users( name, company, job, title,pose ) VALUES (?,?,?,?)";
        db.run(sql, [ name, company, job, title,pose], (err)=> {
            if (err) return res.json({ status:300, success:false, error:err});
            console.log("seccessful input", name, company, job, title,pose);
        });
        return res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

//put request//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//get by id request
app.get("/users/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM users where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

//get by name request
app.get("/users/byname/:name", (req, res, next) => {
    var params = [req.params.name]
    db.get(`SELECT * FROM users where name = ?`, [req.params.name], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

//get request
app.get("/users", (req, res)=>{
    sql=`SELECT * FROM users`;
    try{
        db.all(sql, [], (err, rows)=>{
            if (err) return res.json({ status:300, success:false, error:err});

            if(rows.length<1)
                return res.json({ status:300, success:false, error:"No match"});

            return res.json({status: 200, data: rows, success: true});


        });
        
    }catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})



//delete equest 
app.delete("/users/:id", (req, res, next) => {
    db.run(`DELETE FROM users WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});







///projects
//post request
app.post("/projects", (req, res) =>{
    try {
        const{ name, start, finish, layername, model}= req.body;
        sql ="INSERT INTO projects( name, start, finish, layername, model ) VALUES (?,?,?,?,?)";
        db.run(sql, [ name, start, finish, layername, model], (err)=> {
            if (err) return res.json({ status:300, success:false, error:err});
            console.log("seccessful input", name, start, finish, layername, model);
        });
        return res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

//put request//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//get by id request
app.get("/projects/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM projects where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

//get request
app.get("/projects/byname/:name", (req, res)=>{
    var params = [req.params.name]
    sql=`SELECT * FROM projects where name = ?`;
    try{
        db.all(sql, [req.params.name], (err, rows)=>{
            if (err) return res.json({ status:300, success:false, error:err});

            if(rows.length<1)
                return res.json({ status:300, success:false, error:"No match"});

            return res.json({status: 200, data: rows, success: true});


        });
        
    }catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})
//get request
app.get("/projects", (req, res)=>{
    sql=`SELECT * FROM projects`;
    try{
        db.all(sql, [], (err, rows)=>{
            if (err) return res.json({ status:300, success:false, error:err});

            if(rows.length<1)
                return res.json({ status:300, success:false, error:"No match"});

            return res.json({status: 200, data: rows, success: true});


        });
        
    }catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})



//delete equest 
app.delete("/users/:id", (req, res, next) => {
    db.run(`DELETE FROM users WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })