const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3019;

const app = express();
app.use(express.static(path.join(__dirname, "../")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb+srv://BonAdmin:W758D64duwqAhlZY@bondb.27kxa.mongodb.net/BonDB");
const db = mongoose.connection
db.once("open", () => {
    console.log("MongoDB connection succesfull")
})

const bonSchema = new mongoose.Schema({
    Bonner: String,
    BonTijdMS: String,
    BonTijdSec: Number,
    Logger: String,
    CreatedAt: String
})

//const userSchema

const Bonners = mongoose.model("Timer", bonSchema)

app.get("/", (req, res) => {
    //res.send("Hello world")
    res.sendFile(path.join(__dirname, "../index.html"))
})

app.get("/get", (req, res) => {
    Bonners.find({}).then(function(users){
        res.json(users)
    }).catch(function(er){
        console.log(err)
    })
})

app.post("/post", async (req, res) => {
    //stuur naar cmd
    //console.log("Post werkt", req.body, req.body.Bonner);
    //stuur in browser
    //res.json({ message: "Data received successfully", data: req.body });
    const {Bonner, BonTijdMS, BonTijdSec, Logger, CreatedAt} = req.body
    const bon = new Bonners({
        Bonner,
        BonTijdMS,
        BonTijdSec,
        Logger,
        CreatedAt    
    })    
    await bon.save()
    console.log(bon)
    res.send("Succesvol verzonden")
})

app.listen(port, () => {
    console.log("Server started")
})