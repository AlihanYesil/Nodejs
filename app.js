    const  express = require("express");
    const morgan = require("morgan");
    const mongoose = require("mongoose");
    const adminRoutes = require("./routes/adminRoutes");
    const blogRoutes = require("./routes/blogRoutes");
    const authRoutes = require("./routes/authRoutes");
    const cookieParser = require("cookie-parser")
    const {requireAuth,checkUser} = require("./Middleware/authMiddleware")
    const req = require("express/lib/request");
    const { redirect } = require("express/lib/response");

    const dbURL ="mongodb+srv://Alihan:lolo4125@nodeblog.o0qua.mongodb.net/node-blog?retryWrites=true&w=majority"
      mongoose.connect(dbURL).then((result) => {app.listen(3000) }).catch((err) => { console.log(err) })
    
    const app = express();

    app.use(express.static('public'))
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser());
    app.set("view engine","ejs")

    app.get('*',checkUser)
   

    app.get('/',(req,res) =>{  

        res.redirect('/blog')
       
      });

    

   app.use('/',authRoutes);
   app.use('/admin',requireAuth,adminRoutes);
   app.use('/blog',requireAuth,blogRoutes);
   

   app.get('/about',(req,res) =>{
    res.render("About",{title:"Hakkimda"});
    });


    app.get('/login',(req,res) => {
    res.render("login",{title:"Giriş yap"})
    })

    app.get('/about-us',(req,res)=>{
    res.redirect('/about')
    })

    app.use((req,res) => {
    res.status(404).render("404",{title:"bulunamadı"})
    })