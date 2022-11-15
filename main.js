var http=require('http')
const fs=require('fs')
http.createServer(function(req,res){
    res.setHeader('Content-Type', 'text/html')
    let path= "./views/"
    switch(req.url){
        case "/":
            path+='main.html'
            break
        case "/about":
            path+="about.html"
            break
        case "/log":
            path+="log.html"
            break
        default:
            path+="404.html"

    }
    fs.readFile(path, (err,data)=>{
        if (err){
            console.log(err)
            res.end()

        }
        res.write(data)
        res.end()
    })
   
}).listen(8080,()=>{
    console.log('listening the request from the browser')
});