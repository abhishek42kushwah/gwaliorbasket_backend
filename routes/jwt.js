
var { expressjwt: jwt } = require("express-jwt");

function jwts(){
    return jwt({ secret: "abhishek",algorithms:["RS256","HS256"]}).unless({
        path:[
//public routes that don't require authentication
    "/company/chl_company_login" 
        ],
    })
}

module.exports = jwts;