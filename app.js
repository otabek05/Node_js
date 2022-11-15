const express=require('express')
const app=express()

app.listen(3000,()=>{
    console.log('Server is running!!!')
})

app.get('/', (req,res)=>{
    res.sendFile('./views/main.html',{root:__dirname})
})

app.get('/about', (req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname})
})

app.get('/log', (req,res)=>{
    res.sendFile('./views/log.html',{root:__dirname})
})


app.use((req,res)=>{
    res.sendFile('./views/404.html',{root:__dirname})
    console.log('404 file sent')
})