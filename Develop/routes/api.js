var express = require("express");
var app = express();
var note = require("../db/notes.js");

app.get("/notes", function(req,res){
    note.getNotes()
    .then(notes => res.json(notes))
    .catch(err => console.log(err))
})