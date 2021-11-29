import * as React from 'react'
import Form from './Form'
import EN from '../utils/EN'
import ES from '../utils/ES'
import Aos from 'aos'
import "aos/dist/aos.css"

const ContactForm = ({locale, textForm, title}) => {

  React.useEffect(()=> Aos.init(), [])

  return (
    <>
      <div className="container" >
        {title && <h1 id="form">{ locale === 'es-CO' ? ES.form.title  : EN.form.title} </h1>}
        <section data-aos="fade-right" className="container-form">
          <div className="left-form">
            <div className="message-one">
            <h1>{textForm.ES 
            ? (locale === 'es-CO' ? textForm.ES.head  : textForm.EN.head)
            :
            textForm?.head}</h1>
            </div>

            <div className="message-two">
            {textForm.ES 
            ? (locale === 'es-CO' ? textForm.ES.message  : textForm.EN.message)
            :
            textForm?.message}
            </div>
          </div>

          <div className="right-form">
            <Form locale={locale} language={{ES, EN}}/>
          </div>
        </section>
      </div>

      <style jsx>{`
        .container{
          display: flex;
          flex-direction: column;
          background-image: url('/bg-form.svg');
          background-size: cover;
          background-position: 0%;
          background-repeat: no-repeat;
         

        }

        .container > h1 {
           text-align:center;
           font-size:3.5vw;
           margin: 2rem;
           font-family:'Lexend Exa', sans-serif;
           font-weight: 500;
        }
        

        .container-form{
          display:flex;
          height: inherit;
          border-radius: 12px;
          max-width:50rem;
          width: 100%;
          margin:auto;
          margin-bottom: 5rem;
          background: white;
          box-shadow: 1px -1px 7px -1px rgb(3 0 0 / 65%);
          
        }

        .left-form{
            display:flex;
            flex-direction: column;
            margin:auto;
            padding-left: 4rem;
            width:50%;
          
        }

        .right-form{
          width:50%;
          height:100%;
        }

        .message-one {
          display:flex;
          flex-wrap:wrap;
         
        }

        .message-one > h1 {
          position: relative;
          text-align: left;  
          padding-bottom:1rem;
          font-family: 'Lexend Exa', sans-serif;
          font-size:2rem;
          font-weight: 500;
        }

        .message-one > h1::after {
            content: "";
            height: 2px;
            width: 80%;
            background-color:  #59b7f7;
            position: absolute;
            left: 0px;
            bottom: 0;

        }

        .message-two{
            font-size: 1rem;
            margin: 1rem 0;
            padding-right: 1rem;
          
        }

        @media (max-width: 768px) {
          .container-form {   
            width: 80%;
          }
          
        }

        @media (max-width: 540px) {
          .container-form {  
            flex-direction:column-reverse;
            width: 90%;
          }
          .left-form, .right-form {
            width: 100%;
            padding: 1rem;
            margin: 0;
          }
          .container > h1 {
            font-size: 3rem;
            margin: 1rem auto;
          }
          .message-one > h1,
          .message-two {
            width:100%;
            text-align:center;
            font-size:1rem;
          }
          
        }
      
      `}</style>

    </>
  )
}

export default ContactForm
