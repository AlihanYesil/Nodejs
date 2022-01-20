
const jwt = require("jsonwebtoken")
const User = require("../models/users")



const requireAuth=(req,res,next) =>{
    const token = req.cookie.jwt

if(token ){
    jwt.verify(token,"gizli kelime",(err,decodedToken) => {
        if(err){
            console.log(err)
            res.redicect('/login')
        }else{
            console.log()
            next()
        }
    })
}else{
    res.redicect('/login')
}

}



const checkUser=(req,res,next)=>{
    const token = req.cookie.jwt

if(token ){
    jwt.verify(token,"gizli kelime",async(err,decodedToken) => {
        if(err){
            console.log(err)
            res.locals.user=null
        }else{
            console.log(decodedToken)
            let user = await User.findById(decodedToken.id)
            res.locals.user=user
            next()
        }
    })
}else{
   res.locals.user=null
   next()
}

}
module.exports={requireAuth,checkUser}