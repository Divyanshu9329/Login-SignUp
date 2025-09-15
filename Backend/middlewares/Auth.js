
const jwt = require('jsonwebtoken');

const ensureAuthenticated=(req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
            .json({message: 'Unauthorized User, JWT token is required'})
    }

    // Extract token (remove "Bearer " prefix if present)
    const token = auth.startsWith('Bearer ')
        ? auth.split(' ')[1]
        : auth;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403)
        .json({message: 'Unauthorezed User , jwt token wrong'})
    }
}

module.exports={
    ensureAuthenticated
}