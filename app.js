const express=require('express')
const app=express()
const morgan=require('morgan')
const mongoose=require('mongoose')
const Blog=require('./models/blogs')
const { render } = require('ejs')
const { result } = require('lodash')
const { findByIdAndDelete } = require('./models/blogs')

// connect to mongoDB
const dbURI="mongodb+srv://otash:otabek@cluster0.ywryelu.mongodb.net/node_js?retryWrites=true&w=majority"
mongoose.connect(dbURI)
  .then((result)=>{
    console.log('Connected to db')
    app.listen(3000,()=>{
    console.log('Server is running')
  })})
  .catch((err)=>{console.log(err)});

//register view engine

app.set('view engine', 'ejs')


// middleware 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//mongooose and mongo sendbox
app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'new blog 2',
        type:'about my blog',
        body:'more about my new blog'
    });
    blog.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        console.log(err)
      })
})

app.get('/all-blogs', (req,res)=>{
  Blog.find()
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })
})
app.get('/', (req,res)=>{
    res.redirect('/blogs');
})

app.get('/about', (req,res)=>{
    res.render('about');
})


// Blog routes

app.get('/blogs',(req,res)=>{
  Blog.find().sort({createdAt:-1})
    .then((result)=>{
      res.render('main', {title:"All Blogs", blog:result})

    })
    .catch((err)=>{
      console.log(err)
    })
})

// post request

app.post('/blogs',(req, res)=>{
  const blog=new Blog(req.body);

  blog.save()
    .then((result)=>{
      res.redirect('/blogs')

    })
    .catch((err)=>{
      console.log(err)
    })
})

app.get('/blogs/:id',(req,res)=>{
  const id= req.params.id.trim()
  Blog.findById(id)
     .then((result)=>{
      res.render('details', {blog:result})
     })
     .catch((err)=>{console.log(err)})
})

app.delete("/blogs/:id", (req,res)=>{
  const id = req.params.id.trim()
  Blog.findByIdAndDelete(id)
      .then((result)=>{
        res.json({redirect:"/blogs"})
      })
      .catch(err=> console.log(err))
})

app.get('/create', (req,res)=>{
    res.render('blogs')
})
