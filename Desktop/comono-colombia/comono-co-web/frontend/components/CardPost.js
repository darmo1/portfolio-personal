import React from "react";
import { urlFor } from "../lib/sanity";

const CardPost = ({ post }) => {
  return (
    <article>
      <div
        className="img-container"
        // style={{
        // 	backgroundImage: `url(${post.mainImage.asset.url})`
        // }}
      >
        <img src={post.mainImage.asset.url} alt="" />
      </div>
      <div  className="card-excerpt">
        <div>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </div>
        <div className="mini-article-meta">
          <div className="author-info">
            <img
              src={urlFor(post.authorImage).url()}
              alt={post.name}
              className="img-author"
            />
            <p className="author-name">{post.name}</p>
          </div>
          <p>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        article {
          width: 300px;
          margin: 1rem;
          background-color: #f4f4f4;
          cursor: pointer;
          border-radius: 20px;
          color: black;
          height: 600px;
        }

        .img-container {
          height: 200px;
          // background-position: top;
          // background-repeat: no-repeat;
          // background-size: cover;
          position: relative;
          top: -20px;
          left: 20px;
          margin-top: 3rem;
          overflow: hidden;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }

        .img-container:hover img {
          -webkit-transform: scale(1.2);
          transform: scale(1.1);
          transition: transform 0.3s ease 0s;
        }

        article div:nth-child(2) {
          padding: 1rem;
        }

        h2 {
          margin-bottom: 1rem;
          color: #ac3f3f;
        }

        p {
          margin-bottom: 1rem;
        }

        .mini-article-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .author-info {
          display: flex;
          align-items: flex-end;
          color: #ac3f3f;
        }

        .author-info img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin: 12px 10px;
          filter: grayscale(100%);
        }

        span {
          font-size: 0.875rem;
        }

		.card-excerpt{
			display:flex;
			flex-direction: column;
			justify-content: space-between;
			height: 400px;
		}

        @media (max-width: 320px) {
          article {
            width: 250px;
          }
        }
      `}</style>
    </article>
  );
};

export default CardPost;
