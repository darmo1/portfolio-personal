import React from 'react'

const Technologies = () => {
  return (
    <>
      <div className="container d-flex">
        <div className="technologies d-flex align-items-center">
          <img src="/react.svg" alt="react" />
          <img src="/aws.svg" alt="aws" />
          <img src="/python.svg" alt="python" />
          <img src="nodeJs.svg" alt="nodeJs" />
        </div>
      </div>
      <style jsx>{`
        .container{
          margin: auto;
        }
        
        .technologies {
          flex-wrap: wrap;
          max-width: 70rem;
          width:100%;
          padding:2rem 0;
          margin:auto;
          justify-content: center;
         
        }

        img{
          
          height: 40px;
          margin: 0 1.5rem;
        }

        @media(max-width: 540px){

          .technologies {
            justify-content: center;
          }

          img{
            margin: 0 1rem;
          }

          img:nth-child(1),
          img:nth-child(2){
              height: 30px;
              width:30px;
          }

          img:nth-child(1){
            width: 23px;
          }
            img:nth-child(3),
            img:nth-child(4){
                height: 50px;
                width: 70px;
                
            }
        }
        `}</style>
    </>
  )
}

export default Technologies
