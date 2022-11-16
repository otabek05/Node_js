const express=require('express')
const app=express()
const morgan=require('morgan')

//register view engine

app.set('view engine', 'ejs')

app.listen(3000,()=>{
    console.log('Server is running!!!')
})

// middleware 
app.use(express.static('public'));


app.get('/', (req,res)=>{
    res.render('main');
})

app.get('/about', (req,res)=>{
    res.render('about');
})


app.get('/blogs/create', (req,res)=>{
    res.render('blogs')
})

app.use((req,res)=>{
    res.render('404')
    console.log('404 file sent')
})