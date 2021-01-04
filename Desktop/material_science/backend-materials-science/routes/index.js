const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')


module.exports = function(){

    //Here, You can add different routes in you website
    
    //Muestra un Blogs
    router.get("/blog", blogController.mostrarBlog )
    
    //Muestra un Blog en especifico
    router.get("/blog/:id", blogController.mostrarBlogId);

    //Crear Blog
    router.post("/blog", blogController.nuevoBlog )

    return router
}