import dotenv from 'dotenv';
dotenv.config();

import Express  from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { User, Certificate } from "./model/database.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from 'util';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const unlinkAsync = promisify(fs.unlink);


const app = Express();
const port = process.env.PORT_NUMBER;


app.use(cors());
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


const checkAuth = (req, res, next) => {
    //if (req.session.isAuthenticated) {
      // user is authenticated, so allow them to proceed
      next();
    // } else {
    //   // user is not authenticated, so redirect them to the login page
    //   console.log("Not");
    //   res.send("You are not auth");
    // }
  };

// -------------------------------------------------------------------------------
//   Certificate Upload Section
// ------------------------------------------------------------------------------
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|pdf)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
}) 

app.post("/upload", checkAuth, imageUpload.single('certificate'), async (req, res)=>{

    const certificateObj = {
        img: {
            data: fs.readFileSync(path.join(__dirname +"/images/"+req.file.filename)),
            contentType: 'image/png'
        },
        userName : { data : ""},
        certificateName : { data: req.body.certificate_name},
        creadentialId : { data : req.body.certificate_cred_id},
        creadentialUrl : { data : req.body.certificate_cred_url},
        group : { data : req.body.certficate_domain}
    }

    console.log(certificateObj);

    Certificate.create(certificateObj, (err, item) =>{
        if(err){
            res.send("error")
        }else{
            res.send("success");
        }
    })

    await unlinkAsync(req.file.path)
})

app.get("/display", (req, res)=>{
    console.log("Display called");
    Certificate.find({}, (err, items) =>{
        if(err){
            console.log(err);
            res.status(500).send("Oops");
        }else{
            res.send(items);
        }
    })
})

app.get("/upload", (req, res)=>{
    res.render("upload");
})

// -----------------------------------------------------------------------------



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
    
    if (req.isAuthenticated) {
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
            res.send({response: "fail"})
            // res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                // res.redirect("/secrets");
                console.log("Hello");
                res.send({response : "success"})
            });
        }
    })
});

app.post("/login", function(req, res){
    const user = new User({
        username : req.body.username,
        password : req.body.password
    });
    console.log(user);
    req.login(user, function(err){
        if (err) {
            console.log(err);
            // res.redirect("/login");
            res.send({response : "fail"});
        }
        else {
            passport.authenticate("local")(req, res, function(){
                // res.redirect("/secrets");
                res.send({response : "success"});
            });
        }
    })
});



// Home page
app.get('/', (req, res)=>{
    res.send("Node JS Home Page!");
});


// Server listening port 
app.listen(port, (req, res) =>{
    console.log(`Server Connected on Port number: ${port}`);
});