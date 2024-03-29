import dotenv from 'dotenv';
dotenv.config();
import Express  from "express";
import jwt from "jsonwebtoken";
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
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let decoded = "";

    console.log(authHeader);

    if (!token) {   
        return res.status(401).send('Unauthorized...');
    }

    try {
        decoded = jwt.verify(token, 'mysecretkey');
    } catch (error) {
        return res.status(401).send('Unauthorized!!!');
    }

    res.locals.userName = decoded.pName;

    next();
}
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
        fileSize: 4000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
}) 

app.post("/upload", verifyToken, imageUpload.single('certificate'), async (req, res)=>{
    const userName = res.locals.userName;

    const certificateObj = {
        img: {
            data: fs.readFileSync(path.join(__dirname +"/images/"+req.file.filename)),
            contentType: 'image/png'
        },
        userName : userName,
        certificateName : req.body.certificate_name,
        creadentialId : req.body.certificate_cred_id,
        creadentialUrl : req.body.certificate_cred_url,
        group : req.body.certificate_domain
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


// UPDATE USER DETAILS
app.put('/update', (req, res) => {
    const obj = req.body;
    console.log("RECEIVED: " + obj.userName)
    Certificate.updateMany(
        { userName: obj.userName, certificateName: obj.initialName},
        { $set: { certificateName: obj.Name, creadentialId: obj.Id, creadentialUrl: obj.URL, group: obj.Domain } }
    , (err, result) => {
        if (err) {
            console.log("error in upd");
            res.send(err);
        } else {
            console.log("ffffffSuccess...");
            console.log(result);
            res.send('success');
        }
    })
})


app.get("/display", verifyToken, (req, res)=>{

    const userName = res.locals.userName;

    Certificate.find({userName : userName}, (err, items) =>{
        if(err){
            res.status(500).send("Oops");
        }else{
            res.send(items);
        }
    })
})

app.get("/findUser/:findName", (req, res) => {
    Certificate.find({userName : req.params.findName}, (err, items) =>{
        if(err){
            res.status(500).send("Oops");
        }else{
            res.send(items);
        }
    })
})

app.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    Certificate.findOneAndDelete({certificateName:name}, (err,data) => {
        if(err) {
            res.send(err);
        } else {
            res.send("success");
        }
    })
})


app.get("/profile", verifyToken, (req, res) =>{
    const userName = res.locals.userName;
    

    let noOfCertificates = 10;

    Certificate.find({userName : userName}, (err, items) =>{
        if(err){
            res.status(500).send("Oops");
        }else{
            const len = items.length
            res.send({
                length : len,
                name : userName
            });
        }
    })
});

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
        }
        else {
            passport.authenticate("local")(req, res, function(){
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
    const payload = {
        pName : user.username
    }
    const secretKey = 'mysecretkey';
    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, secretKey, options);
    console.log(token);

    req.login(user, function(err){
        if (err) {
            console.log(err);
            res.send({response : "fail"});
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.send({token});
            });
        }
    })
});



// Server listening port 
app.listen(port, (req, res) =>{
    console.log(`Server Connected on Port number: ${port}`);
});