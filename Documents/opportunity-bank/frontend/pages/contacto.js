import React from 'react'
import Banner from '../components/Banner'
import { contactItem } from '../utils/contactItems'
import SectionTitle from '../components/SectionTitle'

const Contacto = () => {
  return (
    <>
      <Banner title="Contáctanos" image_url="/contacto-banner.png" />
      <section className="bg-color_gray_2 md:h-sm">
        <div className="main-wrapper flex flex-col items-center justify-around h-full p-4 md:flex-row">
          {contactItem.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center bg-white rounded-lg w-full h-60 mb-8  pt-10 md:w-5/12"
              >
                <div className="flex justify-between items-center border-b-2 color_gray_5 w-4/5 pb-6">
                  <p className="text-color_primary_1 font-semibold w-3/5 text-2xl lg:text-3xl ">
                    {item.title}
                  </p>
                  <a href={item.url} className="w-2/5">
                    <img src={item.src} alt="icon" className="" />
                  </a>
                </div>
                <div className="text-xl font-semibold font-section pt-4">{item.text}</div>
              </div>
            )
          })}
        </div>
      </section>
      <section className="h-lg pt-10">
        <div className="main-wrapper px-4">
          <SectionTitle color_title="color_primary_1">
            <strong>Visita</strong> nuestras oficinas
          </SectionTitle>
        </div>
        <div className="w-screen h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7932.28405308803!2d-75.5781646!3d6.245007!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442854ae337375%3A0x512fcd55d33a42b2!2sCentro%20Administrativo%20La%20Alpujarra!5e0!3m2!1ses!2sco!4v1634710839881!5m2!1ses!2sco"
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>
    </>
  )
}

export default Contacto
