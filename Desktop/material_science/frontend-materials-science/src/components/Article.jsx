import React from "react";
import "../styles/article.css"

const Article = ({ article }) => {

  const contentText = article.content;
  const excerpt = contentText.slice(0, 350);

  return (
    <div className="Single-article">
      <span>{article.date}</span>
      <h3>{article.title}</h3>

      <p>{`${excerpt} ... leer más`}</p>

      <div className="author-row">
        <div>{article.author}</div>
        <div>{article.profession}</div>
      </div>
    </div>
  );
};

export default Article;
