var mysql= require("mysql")
try {
      var pool=mysql.createConnection(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456789',
       database:'gwaliorbasket',
       connectionLimit:100,
       multipleStatements:'true',
    }
    ) 
    console.log("db Connected")
  } catch (error) {
    if (err) {
        console.log("error", err);
        return;
    }
  }
module.exports=pool.connect