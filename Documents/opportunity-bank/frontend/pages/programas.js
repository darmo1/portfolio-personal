import React from 'react'
import Banner from '../components/Banner'
import Section from '../components/Section'
import { entitiesItem } from '../utils/entitiesItem'
import SectionTitle from '../components/SectionTitle'

const Programas = () => {
  return (
    <>
      <Banner title="Programas" image_url="/programas-banner.svg" />
      <Section
        title="Red de Apoyo Financiero"
        image_url="/section1-programas.png"
        color="bg-color_gray_2"
        button="Ver más"
        url_button="#entidades-apoyo"
      >
        <p className="font-section font-semibold">
          La Red de Apoyo Financiero es coordinada por el Banco de las oportunidades de la
          Alcaldía de Medellín. Está conformada por bancos, cooperativas e instituciones
          financieras que te apoyan para alcanzar tus metas, a través de la entidad de tu
          preferencia.
        </p>
        <br />

        <p className="font-section font-semibold">
          {' '}
          Si necesitas crédito para vivienda, estudio, libre inversión u otras necesidades,
          consulta en las entidades de la RAF
        </p>
      </Section>

      <section className="bg-color_gray_2" id="entidades-apoyo">
        <div className="main-wrapper px-4">
          <SectionTitle color_title="color_primary_1">
            <strong>Entidades</strong> de Red de Apoyo Financiero
          </SectionTitle>
          <div className="grid grid-cols-16 overflow-x-scroll hide-scrollbar gap-x-4 gap-y-12 pb-16 sm:grid-cols-3 lg:grid-cols-5">
            {entitiesItem.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 flex justify-center items-center w-44 h-24 sm:w-full"
                >
                  <img src={item.src} alt="img" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Section
        title="Artesanías con Amor"
        image_url="/section3-programas.png"
        color="bg-white"
        side_left
        side_color="left"
      >
        <p className="font-section font-semibold">
          Artesanías con Amor es la marca que distingue a los artesanos que apoyamos desde
          nuestra Escuela de Artes y Oficios. A través de la participación en ferias y eventos
          de ciudad logramos que se comercialicen sus obras generando ingresos para sus familias
          y se posicionen sus marcas para el fortalecimiento de sus talleres.
        </p>
        <br />
        <p className="font-section font-semibold">
          {' '}
          Nos motiva fortalecer, visibilizar y potenciar los talleres de nuestros artesanos.
          Brindamos formación en temas empresariales como marketing digital, exhibición de
          producto, contabilidad, entre otros.
        </p>
        <br />

        <p className="font-section font-semibold">
          Si eres Artesano, vives en Medellín o en cualquiera de sus corregimientos y quieres
          ser parte de Artesanías con Amor, comunícate con nuestros asesores y pregunta por la
          Escuela de Artes y Oficios.
        </p>
      </Section>

      <Section
        title="Comerciantes con Futuro"
        image_url="/section4-programas.png"
        color="bg-color_gray_2"
        side_color="right"
      >
        <p className="font-section font-semibold">
          Trabajamos por el futuro de los comerciantes informales del centro de la ciudad,
          regulados y no regulados por la Subsecretaría del Espacio Público. En articulación con
          los diferentes programas de la Administración, generamos oportunidades de formación y
          capacitación en temas como finanzas, exhibición de producto, atención al cliente y
          acompañamiento psicosocial para la realización de sus proyectos de vida.
        </p>
        <br />
        <p className="font-section font-semibold">
          {' '}
          Si eres comerciante informal del centro de la ciudad y quieres unirte, comunícate con
          nuestros asesores y pregunta por el programa Comerciantes Informales del Banco de las
          Oportunidades.
        </p>
        <br />
      </Section>
    </>
  )
}

export default Programas
