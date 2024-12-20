const { test,after,beforeEach }=require('node:test')
const assert=require('node:assert')
const mongoose=require('mongoose')
const supertest=require('supertest')
const Blog=require('../models/blog')
const app=require('../app')
const api=supertest(app)
const helper=require('./testHelper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlog){
        let blogDBObj=Blog(blog)
        await blogDBObj.save()
    }    
})

test('correct amount and format of blogs are returned', async() => {
    const response =await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,2)
})

test('blog can be viewed by id', async() => {
    const blogsAtStart=await helper.blogsInDB()
    const target= blogsAtStart[0]
    console.log(`targetBlog`, target)
    
    const result=await api
      .get(`/api/blogs/${target.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log('result from api',result.body);
    
    assert.deepStrictEqual(result.body,target)
})

test('a blog can be create with POST request', async() => {
    const blogObj={
        title: 'I want to make kimchi',
        author: 'xinxin Wang',
        url:'www.qq.com',
        likes:1
    }

    await api
      .post('/api/blogs')
      .send(blogObj)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const response=await api.get('/api/blogs')
    const blogsAfterPost=response.body
    const titles=blogsAfterPost.map(b=>b.title)
    assert.strictEqual(blogsAfterPost.length,helper.initialBlog.length+1)
    assert(titles.includes('I want to make kimchi'))
}) 

test('if likes property is missing,then it defaults to 0', async() => {
    const blogObj={
        title: 'likes is missing',
        author: 'xinxin Wang',
        url:'www.qq.com',
    }

    await api
        .post('/api/blogs')
        .send(blogObj)

    const response=await api.get('/api/blogs')
    const blogs=response.body  
    const lastSavedBlog=blogs[blogs.length-1]
    assert.strictEqual(lastSavedBlog.likes,0)
})

test('POST request without content or url will result in 400 response', async() => {
    const blogObj={
        author: 'xinxin Wang',
        title:"url is missing"
    }
    await api
        .post('/api/blogs')
        .send(blogObj)
        .expect(400)

    const blogObj2={
        author: 'xinxin Wang',
        url:"www.titleismissing.com"
    }

    await api
        .post('/api/blogs')
        .send(blogObj2)
        .expect(400)
    const blogs=(await api.get('/api/blogs')).body
    assert.strictEqual(blogs.length,helper.initialBlog.length)
})

test('can delete post with valid id',async () => {
    const blogsAtStart=await helper.blogsInDB()
    const blogToDelete=blogsAtStart[0]
    
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const response= await api.get('/api/blogs')
    const blogsTitlesAfterDelete=response.body.map(b => b.title)
    assert(!blogsTitlesAfterDelete.includes('I love black coffee'))
})

test('the likes property of a blog can be updated by id', async () => {
    const blogsAtStart=await helper.blogsInDB()
    const blogToUpdate=blogsAtStart[0]
    const blogObj={
        title: 'I love black coffee',
        author: 'xinxin Wang',
        url: 'www.163.com',
        likes: 10000
    }
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogObj)
        .expect(200)

    const response=await api.get('/api/blogs')
    const firstBlog=response.body[0]
    assert.strictEqual(firstBlog.likes,10000)
})

after(async () => {
    await mongoose.connection.close()
    console.log('Database connection closed')
})