const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session")
require("./db/conn");
const register = require("./models/register");
const port = process.env.PORT || 8000;

// public static path
const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.use(session({
  secret: "djfgjsdgfjhfdghdfggfdhfghd",
  resave: true,
  saveUninitialized: true,
  // cookie: {secure: true}
}));

var sess;
// routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  if(req.session.email){
    res.render("weather",{name: req.session.name});
  }else{
    res.render("login");
  }
  
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/do_register", async (req, res) => {
  try {
    const registerPerson = new register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const registered = await registerPerson.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(400).send(`<h1>register details are in valid try another email<a href="/register">go_to_register</a></h1>`);
  }
});

app.post("/do_login", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await register.findOne({email: email});
    if(user){
      if(user.password == password){
        sess = req.session;
        sess.name = user.name;
        sess.email = user.email;
        res.redirect("/weather");
      }else{
        res.send(`<h1>login details are in valid <a href="/login">login</a> again</h1>`);
      }
    }else{
      res.send(`<h1>login details are in valid <a href="/login">login</a> again</h1>`);
    }

  } catch (error) {
    res.status(400).send(`<h1>login details are in valid <a href="/login">login</a> again</h1>`)
  }
});

app.get("/logout",(req,res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err); 
    }
    res.render("index");
  });
});

app.get("*", (req, res) => {
  res.render("404error");
});
app.listen(port, () => {
  console.log(`localhost:${port} is started`);
});
