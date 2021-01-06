import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Banner from "../components/Banner";
import NoteBlog from "../components/NoteBlog.jsx";

//Importar cliente de axios
import { clienteAxios } from "../config/axios";

import "../styles/blog.css";

const Blog = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

   try{
    const consultarAPI = async () => {
        const blogConsulta = await clienteAxios.get("/blog")
        setBlogs(blogConsulta.data)
    }

    consultarAPI()
    
   }catch(error){
       //Error con autorizacion
       console.log('Entre en un error de axios')
       if(error.response.status === 500){
        props.history.push('/') 
    }
   }
    

  }, [])

  return (
    <div className="Blog">
      <Banner />
      <div className="containerBlog">
        {blogs.length > 0 
        ? (blogs.map(blog => 
        <NoteBlog blog={blog} key={blog._id} />
        ))
        : <h1> No se ha encontrado ningún blog </h1>}
      </div>
    </div>
  );
};

export default withRouter(Blog);
