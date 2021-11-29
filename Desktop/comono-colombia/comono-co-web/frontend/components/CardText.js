import * as React from 'react';
import { PortableText, urlFor } from "../lib/sanity";

const CardText = ({textProps, locale }) => {
    const {project, i , haveShow, setHaveShow, size} = textProps;
  const element = React.useRef(null);


  React.useEffect(()=> {
    const observer = new  IntersectionObserver( entries => {
      
      const { isIntersecting } = entries[0];
      if(isIntersecting){
        const stateCopy = {...haveShow};
        Object.keys(stateCopy).forEach(key => stateCopy[key] = false);
        setHaveShow({...haveShow,[entries[0].target.dataset.project]: true})
      }
    }, { threshold: 0.7 })

    observer.observe(element.current)
  }, [element])

 
  return(
    <>
    <div key={i} className="container-text" ref={element} data-project={i} >
     <div className="text">
    <div className="text-head">
    <a href={`https://${project.nameProject}`} target="_blank">
        <h1>{project.nameProject}</h1>
      </a>
    </div>
      <div className="description-project">{ 
        <PortableText blocks={project.description} /> 
       }
       <div className="technologies-key">
         <b>{locale === 'es-CO' ? `Tecnologías:`   : `Technologies:`  } </b> {project?.technologies  &&  project.technologies.map( (techology, index ) => <span key={index}>{techology} &nbsp;</span>)}
       </div>
      
       </div>
     {size.width <= "768" && 
        (<div className="responsive-image">
          <img src={urlFor(project.imageProject).url()} alt={project.nameProject} />
        </div>)
      }
     </div>
    </div>
    <style jsx>{`
     .container-text{
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content:center;
      color:white;
      background: black;
    }

    a{ 
      color: white;
    }

    .text{
      min-height: inherit;
      padding: 3rem;
      font-family: 'Lexend Exa', sans-serif;
      font-size:2vw;
    }

    .text-head{
      position:relative;
    }

    h1{
      margin-bottom: 2rem;
    }

    h1::before{
     content:"";
     width:70%;
     height: 2px;
     background: white;
     position:absolute;
     bottom: -5px;
     left:-3rem;
     z-index:3;
    }

    h1:hover{
      color:blue;
    }
    .description-project{
      font-size: 1rem;
      line-height : 1.4rem;
      font-family: 'Roboto', sans-serif;
      text-align: justify;
    }

    .technologies-key{
      margin: 2rem 0;
    }
    

    .responsive-image{
      width:100%;
      margin: 1rem auto;
    }

    .responsive-image > img {
      width: 100%;
      height: 100%;
    }

    @media(max-width:768px){
      .container-text{
        min-height: auto;
        padding: 1rem;
      }

      .description-project{
        font-size:1rem;
      }
    }

    
    
    `}</style>

    </>
  )
}

export default CardText
