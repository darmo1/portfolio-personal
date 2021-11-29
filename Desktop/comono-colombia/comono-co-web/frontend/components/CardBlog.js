import React from 'react'
import { urlFor } from '../lib/sanity';

const CardBlog = ({ post }) => {
  return (
    <article className="mini-card">
      <div>
        <p><span>{new Date(post.publishedAt).toLocaleDateString()}</span></p>
        <h2>{post.title}</h2>
      </div>
      <div className="mini-article-meta">
        <div className="author-avatar">
          <img
            src={urlFor(post.authorImage).url()}
            alt={post.name}
            className='img-author'
          />
        </div>
        <p className="author-name">{post.name}</p>
      </div>

      <style jsx>{`
      .mini-card {
        display: flex;
        justify-content: space-between;
        max-width: 170px;
        min-height: 300px;
        max-height:300px;
        padding: 1.5rem;
        border-radius: 16px;
        background: white;
        flex-direction: column;
        transition: 0.2s;
        margin: 0;
        box-shadow: 1px -1px 7px -1px rgba(3, 0, 0, 0.65);
        transform: rotate(353deg);
        cursor: pointer;
      }
      
      .mini-card:focus-within,
      .mini-card:hover {
        transform: translate(0, -1rem);
      }
      
      .mini-card:focus-within ~ .mini-card,
      .mini-card:hover ~ .mini-card {
        transform: translateX(90px);
      }
      
      .mini-card:not(:first-child) {
        margin-left: -100px;
      }
      
      .mini-card h2 {
        font-size: 20px;
        margin: 0.25rem 0 auto;
        color: #ac3f3f;
        font-size: 1rem;
      }
      
      .mini-article-meta {
        margin: 2rem 0 0;
        display: grid;
        grid-template-columns: 60px 1fr;
        align-items: center;
        color: #ac3f3f;
      }
      
      .author-avatar img {
        border-radius: 50%;
        width: 40px;
        height: 40px;;
        margin: 12px 10px;
        filter: grayscale(100%);
      }
      
      @media (max-width: 760px) {

       
        .mini-card {
          transform: rotate(0deg);
          
          max-width:150px;
          box-shadow: -2rem 0 3rem -2rem #000;
        }
      
        article.mini-card:first-child {
          /* transform: rotate(3deg); */
          /* margin-top: -60px;
          margin-left: 80px; */
        }
      
        article.mini-card:nth-child(2) {
          margin-left: -20px;
          transform: rotate(357deg);
          margin-top: -170px;
        }
      
        article.mini-card:nth-child(3) {
          margin-top: -170px;
          margin-left: 91px;
          transform: rotate(357deg);
        }
      
        .mini-card:focus-within ~ .mini-card,
        .mini-card:hover ~ .mini-card {
          transform: translatey(50px);
        }
      }

      @media (max-width: 320px) {
        .mini-card {
          width: 200px;
        }
      }
    
      `}</style>
    </article>
  )
}

export default CardBlog