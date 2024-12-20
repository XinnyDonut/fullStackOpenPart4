const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: {type:String,required:true},
  author: String,
  url: {type:String,required:true},
  likes: {type:Number,default:0}       
} , { toJSON: {
      transform:(document, returnedObj)=>{
        returnedObj.id=document._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
      }
    }
  }
)
const Blog = mongoose.model('Blog', blogSchema)
module.exports= Blog