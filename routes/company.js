const { request, json } = require('express');
var express = require('express');
var jwt = require("jsonwebtoken");
var router = express.Router();
var pool = require('./pool');
var upload=require('./multer');
const { restart } = require('nodemon');
/* API to Add New Products */

router.post('/add_new_company',upload.single('logo'), function(req, res, next) {
 pool.query("insert into company(companyname, ownername, emailaddress, mobilenumber,address, states, city, logo, password, status,createdat, updateat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.file.originalname,req.body.password,req.body.status,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
    if(error){
      res.status(200).json({status:false,message:'Server error... ..'})
    }
    else
    {
      res.status(200).json({status:true,message:'Company Registerd Successfully'})
    }
 })
});


router.get('/fetch_all_company', function(req, res, next) {
  pool.query("select C.*,(select S.statesname from states S where S.statesid=C.states) as statename,(select CC.cityname from Cities CC where CC.cityid=C.city) as cityname from company C",function(error,result){
   if(error)
  
   {
  res.status(200).json({status:false,message:'Server error....'})
   }
   else
   {
    res.status(200).json({status:true,data:result})
   }

  })
}); 


/* API to edit data  */
router.post('/edit_company_data', function(req, res, next) {
  pool.query("  update company set companyname=?, ownername=?, emailaddress=?, mobilenumber=?,address=?, states=?, city=? , status=?, updateat=?, createdby=? where companyid=? ",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.body.status,req.body.updateat,req.body.createdby, req.body.companyid],function(error,result){
     if(error){
      console.log(error)
       res.status(200).json({status:false,message:'Server error... ..'})
     }
     else
     {
       res.status(200).json({status:true,message:'Company Updated Successfully'})
     }
  }) 
 });
 

 router.post('/edit_company_logo',upload.single ('logo'), function(req, res, next) {
  pool.query(" update company set logo=? where companyid=?   ",[req.file.originalname,req.body.companyid],function(error,result){
    
    if(error){
      
       res.status(200).json({status:false,message:'Server error.....'})
     }
     else
     {
       res.status(200).json({status:true,message:'logo Updated'})
     }
  })
 });
 
 router.post('/delete_company_data', function(req, res, next) {
  pool.query("  delete from  company where companyid=? ",[ req.body.companyid],function(error,result){
     if(error){
      
       res.status(200).json({status:false,message:'Server error... ..'})
     }
     else
     {
       res.status(200).json({status:true,message:'Company Deleted Successfully'})
     }
  })
 });

 router.post('/chl_company_login',function(req,res,next){
  pool.query("Select * from company where (emailaddress=? or mobilenumber=?) and password=? and status='Verified'",[req.body.emailaddress,req.body.mobilenumber,req.body.password],function(error,result){
    if(error){
   return res.status(500).json({status:false,message:'Server Error'})
    }
    else{
      if(result.lenght==0)
  return res.status(200).json({status:true,message:'Invalid email address/mobile number/password valid Login'})
      else { 
     var token=jwt.sign({emailaddress:req.body.emailaddress},"abhishek",{expiresIn:'10000s'})
     console.log(token)
        return res.status(200).json({data:result[0],status:true,message:'valid Login',token:token})
      }} 
  }) 
 })
 

module.exports = router;
