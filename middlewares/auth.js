
// three middleware == 1) auth, 2) isStudent, 3)isAdmin

const  jwt= require("jsonwebtoken");
require("dotenv").config();


// 1st middlewares...
exports.auth = (req,res,next) => {
    try{
       
    //extract the JWT token
    //PENDING: other way to fetch token

    const token= req.body.token;

    if(!token){
        
         return res.status(401).json({
            success:false,
            message:'Token Missing',
         });
    }

    //verifying the token.
    try{
        const payload= jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);

        req.user=payload;
    } catch(error) {
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
    }

    next();

    }

    catch(error){
    return res.status(401).json({
        success:false,
        message:'Something went wrong, while verifying the token',
    });

    }
}

// 2nd middlewares
exports.isStudent = (req,res,next) => {
   try{
    
    if(req.user.role != "Student"){
        return res.status(401).json({
            success:false,
            message:'This is a protected route for students',
        });
    }

    next();

   }

   catch(error){
      
    return res.status(500).json({
        success:false,
        message:'User Role is not matching',
    });

   }

}

//3rd middlewares...

exports.isAdmin = (req,res,next) =>  {
    
    try{
    
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for admin',
            });
        }
    
        next();
    
       }
    
       catch(error){
          
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    
       }
}
