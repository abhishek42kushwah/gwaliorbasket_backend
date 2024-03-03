var mysql= require("mysql")
var pool=mysql.createConnection(
    {
        host:'localhost',
       port:3306,
        user:'root',
        password:'1234',
       database:'gwaliorbasket',
       connectionLimit:100,
       multipleStatements:'true',
    }
) 

pool.connect((err) => {
    if (err) {
        console.log("err", err);
        return;
    }
    console.log("db Connected")
})
module.exports=pool