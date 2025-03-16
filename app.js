const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const {connectToMongoDB} = require("./connection");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.port || 3001;
const mongoUrl = process.env.mongoUrl;
const mongoOnlineUrl = process.env.mongoOnlineUrl;

connectToMongoDB(mongoUrl);

app.get('/', (req, res) => {
    res.render("index");  
})

app.get('/read', async(req, res) => {
    const allUsers = await userModel.find();
    res.render("read", {users: allUsers});  
})

app.get('/delete/:id', async(req, res) => {
    const users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read"); 
})

app.get('/edit/:userid', async(req, res) => {
    const user = await userModel.findOne({_id: req.params.userid});
   res.render("edit", {user: user});
})

app.post('/update/:userid', async(req, res) => {
    const {name, email, image} = req.body;
    const user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name: name, email: email, image: image});
   res.redirect("/read");
})


app.post('/create', async(req, res) => {
    const {name, email, image} = req.body;
    const createdUser = await userModel.create({
        name: name,
        email: email,
        image: image
    });
    
    res.redirect("/read")
})

app.listen(port, () => {
    console.log("server connected");
})