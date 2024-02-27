const fs = require("fs");

exports.getFile = function(path){
    return fs.readFileSync("./data"+path);
}

exports.lol = function(res){
    res.write("Test!");
    return res.end();
}   

// https://htd.lol/Editor/ \\
exports.export = function(res,req){
    if (req.method != "POST"){return;}
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=export.rbxlx');
        res.write(body)
        return res.end()
    }); 
}