var http=require('http')
const fs=require('fs')
http.createServer(function(req,res){
    res.setHeader('Content-Type', 'text/html')
    fs.readFile('./views/main.html', (err,data)=>{
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