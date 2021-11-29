import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com'
import validForm from "../utils/validForm";

const Form = ({locale, language}) => {

  const { EN , ES } = language

  const initialContactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }

  const [contactData, setContactData] = useState(initialContactData)
  const [error , setError] = useState({})

  const handleInputChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    })
  }

  const notify = () => {
    toast.success("Formulario enviado exitosamente");
  };

  const warning = () => {
    toast.warning("Oush, algo falló en el envío del formulario.");
  };



  function sendEmail(e){
    e.preventDefault();
    const resultValidate = validForm(contactData)
    setError(resultValidate)
    const isMissingFields = Object.keys(resultValidate).length

    if( !isMissingFields ){
      emailjs.sendForm('service_7c923xk', 'template_3er037x', e.target, 'user_cdInsAiYl5bD2K9pBp1KJ')
      .then((result) => {
          if(result.status === 200){
            notify()
            setContactData(initialContactData)
          }
         
      }, (error) => {
          warning()
          console.log(error.text);
      });
    }
  }

  return (
    <form onSubmit={sendEmail}>
      <div>
        <label>
          <b>{locale === 'es-CO' ? ES.form.name : EN.form.name }</b>
          {error.name && <small>{error.name}</small>}
        </label>
       
        <input
          type="text"
          name="name"
          value={contactData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>
          <b>{locale === 'es-CO' ? ES.form.email : EN.form.email }</b>
          {error.email && <small>{error.email}</small>}
        </label>
       
        <input
          type="email"
          name="email"
          value={contactData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>
          <b>{locale === 'es-CO' ? ES.form.subject : EN.form.subject }</b>
          {error.subject && <small>{error.subject}</small>}
        </label>
       
        <input
          type="text"
          name="subject"
          value={contactData.subject}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>
          <b>{locale === 'es-CO' ? ES.form.message : EN.form.message }</b>
          {error.message && <small>{error.message}</small>}
        </label>
        
        <textarea
          type="text"
          name="message"
          value={contactData.message}
          onChange={handleInputChange}
        />
      </div>
      <div className="btn">
        <input
          className='formButton'
          type="submit"
          name="subject"
          value= {locale === 'es-CO' ? ES.form.button : EN.form.button } 
        />
      </div>

      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />

      <style jsx>{`
        form {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 2rem;
            font-family:'Roboto';
        }

        form > div {
            display: flex;
            flex-direction: column;
        }

        label{
            font-size: 0.875rem;
        }

        input {
          height: 2rem;
          margin: 0.7rem 0;
          padding:  0.625rem;
          font-family:'Roboto';
          
        }

        textarea {
          height: 5.5rem;
          margin: 1rem 0;
          border:none;
          border-left: solid thin;
          border-bottom: solid thin;
          padding:  0.625rem;
          resize:none;
          font-family:'Roboto';
        }

        small{
          color:red;
          margin-left: .5rem;
        }

        .btn{
          align-items: flex-end;
        }
      
        .formButton {
         
          padding: 0 2.5rem;
          background: #59b7f7;
          border-radius: .5rem;
          border:none;
          color:white;
        }
        .formButton:hover{
          cursor: pointer;
          
        }

        @media (max-width: 540px){
          .btn{
            margin:auto;
          }
        }
      `}</style>
    </form>
  );
};

export default Form;
