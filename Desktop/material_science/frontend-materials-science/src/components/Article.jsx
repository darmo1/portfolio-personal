import React from "react";
import "../styles/article.css"

const Article = ({ article }) => {
  return (
    <div className="Single-article">
      <span>{article.date}</span>
      <h3>{article.title}</h3>

      <p>{article.content}</p>

      <div className="author-row">
        <span>{article.author}</span>
        <span>`Ingeniero(a) de materiales`</span>
      </div>
    </div>
  );
};

export default Article;
