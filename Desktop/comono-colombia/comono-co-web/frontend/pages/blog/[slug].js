import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { sanityClient, urlFor } from "../../lib/sanity";
import BlockContent from "@sanity/block-content-to-react"

const Post = () => {
  const router = useRouter()
  const slug = router.query.slug
  const [singlePost, setSinglePost] = useState([])

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            publishedAt,
           'name': author->name,
           'authorImage': author->image
            }`)
      .then((data) => setSinglePost(data[0]))
      .catch(console.error)
  }, [slug])

  if (!singlePost) return <div>Loading...</div>

  return (
    <>
      <div className='parallax-container'
        style={{
          backgroundImage: `url(${urlFor(singlePost.mainImage).url()})`
        }}
      >
        {/* <img src={urlFor(singlePost.mainImage).url()} alt={singlePost.title} /> */}
      </div>
      <div className='container'>
        <h1>{singlePost.title}</h1>
        <div className='post-details'>
          <p>{new Date(singlePost.publishedAt).toLocaleDateString()}</p>
          <p>{`by  ${singlePost.name}`}</p>
        </div>
        <div className='block-content'>
          <BlockContent
            blocks={singlePost.body}
            projectId='af9rpnm9'
            dataset='production'
          />
        </div>

        {/* <img
        src={urlFor(singlePost.authorImage).url()}
        alt={singlePost.name}
        className='img-author'
      /> */}

      </div>
      <style jsx>{`
        .container{
          max-width:60rem;
          margin:0 auto;
          padding: 0 1rem
        }

        .parallax-container{ 
          background-attachment: fixed;
          background-position: top;
          background-repeat: no-repeat;
          background-size: cover;
          height:550px;
        }

        h1{
          text-align: left;
          margin: 2rem 0;
          font-size: 2.5rem;

        }

        .post-details{
          max-width:230px;
          margin:0 auto;
          display:flex;
          justify-content:space-around
        }
       
        .post-details p{
          font-size:14px;
          color: black;
          margin-bottom:1rem;
          font-weight:700;
        }
    
        .block-content{
          word-wrap: break-word;
          line-height: 2;
          text-align:justify;
          
        }

      `}</style>
    </>


  )
}

export default Post

