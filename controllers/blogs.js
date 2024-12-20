const blogsRouter=require('express').Router()
const Blog=require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  try{
    const blogs=await Blog.find({})
    response.json(blogs)
  }catch(exception){
    next(exception)
  }
})

//writing same request using promise
// blogsRouter.post('/', (request, response,next) => {
//     const blog = new Blog(request.body)
  
//     blog
//       .save()
//       .then(result => {
//         response.status(201).json(result)
//       })
//       .catch(error => next(error))
// })

blogsRouter.post('/', async (request, response,next) => {
  const blog = new Blog(request.body)
  try{
    const result=await blog.save()
    response.status(201).json(result)
  }catch(exception){
    next(exception)
  }
})

blogsRouter.get('/:id', async (request,response,next) => {
  try{
    const id=request.params.id
    const blog= await Blog.findById(id)
    response.status(200).json(blog)
  }catch(exception){
    next(exception)
  }
  
})

blogsRouter.delete('/:id',async(request,response,next) => {
  try{
    const id=request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }catch(exception){
    next(exception)
  }

})

blogsRouter.put('/:id',async(request,response,next) => {
  const body= request.body
  const blog={
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }
  try{
    const id=request.params.id
    const updatedBlog=await Blog.findByIdAndUpdate(id,blog,{ new:true })
    response.status(200).json(updatedBlog)
  }catch(exception){
    next(exception)
  }
})



module.exports=blogsRouter