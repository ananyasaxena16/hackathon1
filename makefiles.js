let fs = require("fs");
let path = require("path");


function makeFiles(folderName, data){
    /* First check if the Folder Already Exists
        if not make a directory and add result object
    */
    if( !fs.existsSync(folderName) ){
        fs.mkdirSync(path.join(__dirname, folderName));
        let filePath = path.join(__dirname,folderName,folderName +".json");
        if( !fs.existsSync(filePath) ){
            fs.writeFileSync(filePath, JSON.stringify(data));
        }
    }
}

module.exports = {
    makeFiles : makeFiles
}