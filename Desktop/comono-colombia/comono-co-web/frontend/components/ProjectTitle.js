import React from 'react'

const ProjectTitle = ({locale}) => {
    return (
        <>
        <div className="bg">
            <div className="container">
                <h1>{ locale === 'es-CO' ? 'PROYECTOS ' : `COMONO'S PROJECTS`}</h1>
            </div> 
            <style jsx>{`

            .bg{
                width: 100vw;
                background: #eee;
            }

            .container{
                max-width: 70rem;
                height: 100%;
                margin:auto;
                display:flex;
                
            }
            h1{
                
                margin: auto;
                font-family: 'Lexend Exa',sans-serif;
                font-size: 3.5rem;
                font-weight: bold;
                padding: 2rem;
            }
            @media (max-width: 540px){
                h1{
                    font-size:2rem;
                    padding: 1rem;
                }
            }
            
            `}</style>
        </div>
        </>
    )
}

export default ProjectTitle
