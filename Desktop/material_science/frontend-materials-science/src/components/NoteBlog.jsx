import React from "react";
import { Link } from "react-router-dom";
import "../styles/noteBlog.css";

const NoteBlog = ({ blog }) => {
  const contentText = blog.content;
  const excerpt = contentText.slice(0, 150); // retorna 'La mañana se nos echa encima'

  return (
    <div className="containerNoteBlog">
      <Link to={`/blog/${blog._id}`}>
        <div className="noteBlog-imagen">
          <img src={blog.imagen} alt="Imagen del blog" />
        </div>
        <div className="noteBlog-excerpt">
          <div className="noteBlog-title">{blog.title}</div>
          <div className="noteBlog-summary">{`${excerpt} ... leer más`}</div>
          <div className="owner">
            <p>{blog.author}</p>
            <p>
              <span>Profesion: </span>
              <span>{blog.profession}</span>
            </p>
            <p>
              <span>Twitter: </span>
              <span>{blog.twitter}</span>{" "}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteBlog;
