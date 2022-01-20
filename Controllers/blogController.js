const Blog = require("../models/blogs");     


const blog_get_all =(req,res)=> {
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
       res.render("Anasayfa",{title:"Anasayfa",blogs:result} )
   })
   .catch((err)=>{
       console.log(err)
   })
}


const blog_get_id = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
     .then((result) => {
         res.render('blog',{blog:result,title:'Detay'})
    }).catch((err)=> {
        res.status(404).render('404',{title:'Sayfa Bulunamadı'})
    })
 }

module.exports = {
    blog_get_all,
    blog_get_id

}