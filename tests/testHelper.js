const Blog=require('../models/blog')

const initialBlog=[
  {
    title: 'I love black coffee',
    author: 'xinxin Wang',
    url: 'www.163.com',
    likes: 5
  },

  {
    title: 'I hate lentils',
    author: 'xinxin Wang',
    url:'www.baidu.com',
    likes:19
  }
]
const blogsInDB=async() => {
    const blogs=await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports={ initialBlog,blogsInDB }
