var multer = require("multer");

var happy = multer.diskStorage({
    destination: (req , file , path) =>{
        path(null, "public/images");

    },
    filename: (req, file, path ) =>{
        path (null, file.originalname);
    },
});
var upload = multer ({storage : happy });
module.exports = upload ;