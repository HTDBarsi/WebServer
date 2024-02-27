const http = require('http');
const fs = require('fs');
const url = require('url');
const {port, updateTime} = require('./config.json');
var customs = require("./custom");

function sendData(res,data){
    res.write(data);
    res.end();
}

http.createServer((req,res) => {
    let path = url.parse(req.url,true).pathname;
    let time = new Date();
    console.log(`${time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()} - ${path}`);
    // path doesnt exist \\
    if (!fs.existsSync("./data/"+path)){
        if (customs[path.substring(1)]){
            return customs[path.substring(1)](res,req);
        }
        return sendData(res, customs.getFile("/index.html"));
    }
    // is is directory \\
    if (fs.statSync("./data"+path).isDirectory()) {
        path = (path.endsWith("/") ? path : path+"/") +"index.html";
    }
    return sendData(res, customs.getFile(path));
}).listen(port);

var lastUpdated = fs.statSync("./custom.js").mtimeMs;
function getRecentData(){
    setTimeout(() => {
        if (lastUpdated != fs.statSync("./custom.js").mtimeMs){
            lastUpdated = fs.statSync("./custom.js").mtimeMs;
            // clear cache for most recent data \\
            delete require.cache[require.resolve("./custom.js")];
            customs = require("./custom");
            console.log("Updated!");
        }
        getRecentData();
    },updateTime);
}

getRecentData();