const dummy=(blogs) => {
  return 1
}

const totalLikes=(blogs) => {
  const sum=blogs.reduce((sum,blog) => {
    return sum+blog.likes
  },0)
  return sum
}

const favoriteBlog=(blogs)=>{
    const fav=blogs.reduce((fav,blog)=>{
        if(fav===null){
            return blog
        }
        return blog.likes>fav.likes?blog:fav
    },null)    

    if(fav){
        return{
            title:fav.title,
            author:fav.author,
            likes:fav.likes
        }
    }
    return null
}
module.exports={
  dummy,totalLikes,favoriteBlog
}