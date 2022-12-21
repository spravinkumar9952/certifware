import Express  from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { User } from "./model/database.js";



// Express app
const app = Express();
// port number
const port = 8080;

// json bodyparser
app.use(bodyParser.json());
app.use(Express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
    secret : "our little secret",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());

app.set('view engine', 'ejs');


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secrets", function(req, res){
    
    if (req.isAuthenticated()) {
        res.render("secrets");
    }
    else {
        res.redirect("/login");
    }
});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
      res.redirect('/');
    });
  });
  

app.post("/register", function(req, res){
    User.register({username : req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })
});

app.post("/login", function(req, res){
    const user = new User({
        username : req.body.username,
        password : req.body.password
    });
    req.login(user, function(err){
        if (err) {
            console.log(err);
            res.redirect("/login");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })
});






app.get('/welcomeMsg', (req, res)=>{
    res.send({
        msg : 'Hello Welcome to Certifware'
    });
});


// Home page
app.get('/', (req, res)=>{
    res.send("Node JS Home Page!");
});

// Server listening port 
app.listen(port, (req, res) =>{
    console.log(`Server Connected on Port number: ${port}`);
});