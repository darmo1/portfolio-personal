import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { clienteAxios } from "../config/axios";
import "../styles/SingleBlog.css";

const SingleBlog = (props) => {
  const [infoBlog, setInfoBlog] = useState({});

  //Obtener id
  const { id } = props.match.params;
  //QUERY A LA API
  const consultarAPI = async () => {
    const blogConsulta = await clienteAxios.get(`/blog/${id}`);
    setInfoBlog(blogConsulta.data);
    console.log("Este es el dato del blog", infoBlog);
  };
  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <div>
      <Banner />
      <div>
        <h1 className="title-blog">{infoBlog.title}</h1>
        <div className="content-blog">
          <p>{infoBlog.content}</p>
        </div>
        <div className="info-author-blog">
          <div>
            <strong>{infoBlog.author}</strong>
            <p>
              <small>{infoBlog.profession}</small>
            </p>
            <p>{infoBlog.twitter}</p>
          </div>
          <div>
            <Link to={"/blog"}>
              {" "}
              <span className="return">{`Regresar 👈`}</span>{" "}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;
