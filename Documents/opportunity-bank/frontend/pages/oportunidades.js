import React from 'react'
import Banner from '../components/Banner'
import Section from '../components/Section'

const Oportunidades = () => {
  return (
    <>
      <Banner title="+Oportunidades" image_url="/oportunidades-banner.svg" />
      <Section
        title="Subsecretaría de Creación y Fortalecimiento Empresarial"
        image_url="/section1-oportunidades.png"
        color="bg-white"
      >
        <p className="font-section font-semibold">
          Brinda apoyo a las ideas innovadoras con capacidad de crecimiento según la demanda del
          mercado, y el impulso a los proyectos de Desarrollo Económico de los Planes de
          Desarrollo Local de las comunidades.{' '}
        </p>
      </Section>

      <Section
        title_src="/logo-rutan.svg"
        image_url="/section2-oportunidades.png"
        color="bg-color_gray_2"
        button="Ver más"
        url_button="https://www.rutanmedellin.org/"
        side_left
        side_color="left"
      >
        <p className="font-section font-semibold">
          {' '}
          Somos el centro de innovación y negocios de Medellín; nuestro propósito es contribuir
          al mejoramiento de la calidad de vida de los habitantes de la ciudad a través de la
          Ciencia, la Tecnología y la innovación.
        </p>
      </Section>

      <Section
        title_src="/logo-parque-E.svg"
        image_url="/section3-oportunidades.png"
        color="bg-white"
        button="Ver más"
        url_button="https://parquedelemprendimiento.co/"
        side_color="right"
      >
        <p className="font-section font-semibold">
          Somos una plataforma especializada en emprendimiento, dedicada a incrementar las
          posibilidades de éxito de nuevos negocios y al fomento de la cultura emprendedora de
          Medellín.
        </p>
      </Section>

      <Section
        title_src="/logo-creame.svg"
        image_url="/section4-oportunidades.png"
        color="bg-color_gray_2"
        button="Ver más"
        url_button="https://www.creame.com.co/"
        side_left
        side_color="left"
      >
        <p className="font-section font-semibold">
          {' '}
          Somos el centro de innovación y negocios de Medellín; nuestro propósito es contribuir
          al mejoramiento de la calidad de vida de los habitantes de la ciudad a través de la
          Ciencia, la Tecnología y la innovación.
        </p>
      </Section>
    </>
  )
}

export default Oportunidades
