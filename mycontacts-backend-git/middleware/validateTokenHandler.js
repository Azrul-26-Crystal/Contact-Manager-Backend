const jwt = require("jsonwebtoken")

//Access Token validation function
const validateTokenHandler = (req,res,next) =>{
        //Get the token from header named authorization
        const authHeader = req.headers.authorization
        
        //Check whether the token exist and starts with "Bearer",
        // e.g. "Bearer dh28fh5jH830q14...", "Bearer <token>"
        if(authHeader && authHeader.startsWith("Bearer")){
                //Get the token without "Bearer" in front, <token>
                const token = authHeader.split(" ")[1]
                
                //Verify whether the token is the same token that had been assigned to the user
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
                        //Error handling if token is not the same
                        if(err){
                                res.status(401).json({message:"User is not authorized"})
                        }
                        
                        //Assignes the decoded user info to req.user which can be accessed later
                        req.user = decoded.user
                        next()
                })
        }
        //If token not found or not start with bearer.
        else{
                res.status(401).json({message:"Token not found"});  
        }
}

module.exports = validateTokenHandler