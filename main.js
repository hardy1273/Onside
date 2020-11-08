var express=require('express');
var app=express();
var request=require('axios');
var bodyParser= require("body-parser");
var mongoose=require("mongoose");
var flash=require('connect-flash');
var Campground=require("./models/campground")
var Comment=require("./models/comment")
var seedDB=require("./seeds")
var passport=require("passport")
var LocalStrategy=require("passport-local")
var User=require("./models/user.js")
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campground");
var authRoutes=require("./routes/index");
var methodOverride=require("method-override")
const session=require("express-session")
const MongoStore = require('connect-mongo')(session);
var dbUrl=process.env.DB_URL
require('dotenv').config()
 
app.use(methodOverride("_method"));

app.use(express.static(__dirname+"/public"))

//seedDB()

app.use(flash());

var store= new MongoStore({
    url:dbUrl,
    secret:"merahogyahai",
    touchAfter:24 * 60 * 60
})

store.on("error",function(e){
    console.log("error is",e)
})
app.use(require("express-session")({
    store,
    secret:"BRUHHHHHHHHHHHHHHHHH",
    resave:false,
    saveUninitialized:false
}));
app.locals.moment = require('moment');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next ){
    res.locals.currentUser= req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})




mongoose.Promise=global.Promise;
mongoose.connect(dbUrl, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");



//Campground.create(
    //{
        //name: "Santiago Bernabeu",
        //image:"https://aws-tiqets-cdn.imgix.net/images/content/278357c07f4b444798fd7858a0e83452.jpg?auto=format&fit=crop&ixlib=python-1.1.2&q=25&s=46f9235ca62381fdd6a9f246dc3e3943&w=375&h=250&dpr=2.625",
        //description: "Home to Real Madrid Fc"
    //},  function(err,campground){
        //if (err){
            //console.log(err);
        //} else {
            //console.log("Newly created campground:")
            //console.log(campground);
        //}
    //}
//)

app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



var port= process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Server Started on Port 3000...");
});