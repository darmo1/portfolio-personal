import * as React from "react";
import { useWindowSize } from '../hooks/useWindowSize'
import CardImage from "./CardImage";
import CardText from "./CardText";


const Project = ({ projectList , locale}) => {

  const [ haveShow, setHaveShow ] = React.useState({0:false, 1:false, 2:false, 3:false})
  const size = useWindowSize()

  return (
    <>
      <main className="container-projects">
       { size.width > "768" && <div className="left-images">
          {projectList.map((project, i) => (
            <CardImage imageProp={{ project, i, haveShow, setHaveShow }}  key={i} />
          ))}
        </div>}

        <div className="right-text">
         
          {projectList.map((project, i) => (
            <CardText textProps={{ project, i, haveShow, setHaveShow, size }} key={i} locale={locale} />
            
          ))}
        </div>
      </main>

      <style jsx>{`
      
      .container-projects{
      background: gray;
      display: flex;
      position: relative;
    }

    .left-images, 
    .right-text{
      max-width:50%;
      width:100%;
      background: #eee;
      position: relative;
    }
   

    @media(max-width:768px){
      .right-text{
        max-width: 100%;
      }
      img {
        width: 100%;
      }
      
      .container-project-image {
        background-color: #fff;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .block {
        display: block;
        width: 130px;
        height: 50px;
        background-color: #fff;
        margin-top: 0.8rem;
      }
      
      .head-project {
        padding-left: 2rem;
        font-size: 4rem;
      }
      
      .project-text {
        height: 100%;
        overflow-y: scroll;
        background-color: black;
        overflow-x: hidden;
      }
      
      .project-text::-webkit-scrollbar {
        width: 16px;
      }
      
      .project-text > div {
        color: #fff;
        padding: 0 4rem;
        height: auto;
      }
      
      .project-text > div:last-child {
        height: 100%;
      }
      
      .title-project {
        display: flex;
        width: 60%;
        justify-content: flex-start;
        border-bottom: thin solid white;
      }
      
      .title-project img {
        width: 70px;
      }
      
      .title-project h1 {
        padding: 1rem 0;
        font-size: 2.5rem;
        position: relative;
        padding-left: 1rem;
        color: white;
      }
      
      .comono-project-description {
        margin: 2rem 0;
        font-size: 1.2rem;
      }
      
      @media (max-width: 768px) {
        .article-project {
          flex-direction: column;
        }
      
        .article-project aside {
          width: 100%;
        }
      
        .block {
          width: 70px;
        }
      
        .title-project img {
          width: 50px;
        }
      }
    }
   
      `}</style>

     
    </>
  );
};

export default Project;
