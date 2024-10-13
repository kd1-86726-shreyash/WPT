const jwt = require('jsonwebtoken');
const config = require('../config')

function verifyToken(req,res,next){
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({error : 'Access Denied'});
      try{
        const decoded = jwt.verify(token,config.secret);
        req.name = decoded.name;
        next();
      }catch(error){
        res.status(401).json({error : 'Invalid Token'});
      }  
};

module.exports = verifyToken;
