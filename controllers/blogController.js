const  Blog = require('../models/Blogs');

//Obtener blog
exports.mostrarBlog = async (req, res, next) => {

    try{
        const blog = await Blog.find({});
        res.json(blog);

    }catch(error){
        console.log('Something is wrong :( blog-get', error);
        next();
    }
}

//Muestra blog por su ID
exports.mostrarBlogId = async (req, res, next) => {

    try{
        const blog = await Blog.findById(req.params.id);
        res.json(blog)
    }catch(err){
        
        res.json({mensaje: 'No existe este Blog'})
        next()
    }
}

exports.nuevoBlog = async(req, res, next) => {
    //Se va a mapear con el formato de la tabla
    const blog = new Blog(req.body);

    try{ //Almacenar el registro
        await blog.save();
        res.json({mensaje:'Se agregó un nuevo blog'})

    }catch(err){
        //Si hay error, console.log y luego next()
        res.send(err)
        next()

    }
}