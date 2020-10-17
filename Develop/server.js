var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//functions start here
//also router mapping

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
    notes = fs.readFileSync("./db/db.json");
    notes = JSON.parse(notes);
    notes.push(req.body);
    notes = JSON.stringify(notes);
    res.json(notes);
    fs.writeFileSync("./db/db.json", notes, "utf8");
})

app.delete("/api/notes/:id", (req, res) => {
    var notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(notes);
    var id = req.params.id;
    console.log(id);
    var i = 0;
    notes = notes.filter(res => {
        return res.id != id;
    }
    )
    for (res of notes) {
        res.id = i.toString();
        i++;
    }
    res.json(notes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });