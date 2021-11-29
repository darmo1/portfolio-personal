import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { servicesItem } from '../utils/servicesItem'
import { requirementsItem } from '../utils/requirementsItem'
import { figuresItem } from '../utils/figuresItem'
import { benefitsItem } from '../utils/benefitsItem'
import { carrouselItem } from '../utils/CarrouselItem'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import CarrouselSection from '../components/CarrouselSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Banco de las oportunidades</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex md:h-sm">
        <div className="bg-white w-full"></div>
        <div className="flex flex-col main-wrapper md:flex-row">
          <div className="w-screen">
            {/* <div className="w-full h-full object-cover gradient"></div> */}
            <img src="/home-banner.png" alt="img-capital-semilla" className="w-full h-full" />
          </div>
          <div className="flex justify-center w-screen bg-color_primary_2_ligth py-8 items-center ">
            <div className="text-white flex flex-col items-center justify-around h-96 w-11/12 md:w-2/3 md:h-64 md:items-start">
              <h1 className="text-5xl font-semibold">
                Cumplir tus sueños nunca fue tan fácil.
              </h1>
              <Link href="/switch">
                <a className="border-2 rounded-full px-4 py-4 my-2 text-lg w-full text-center hover:bg-white hover:text-color_primary_1 font-semibold md:w-64">
                  Solicita tu crédito aquí
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-color_primary_2_ligth w-full"></div>
      </section>

      <section className="bg-color_primary_1 text-sm flex items-center h-full md:h-36">
        <div className="main-wrapper hide-scrollbar overflow-x-scroll overflow-y-hidden flex-nowrap flex items-center text-white md:justify-center">
          {servicesItem.map((item, idx) => {
            return (
              <Link href={item.href}>
                <a key={idx}>
                  <div className="service-card flex flex-col py-8 mx-4 w-44 h-full font-semibold md:py-0 md:ml-0">
                    <img src={item.src} alt="img" className="h-10" />
                    <p className="text-center mt-4 mb-0 text-sm">{item.title_sup}</p>
                    <p className="text-center mt-0 text-base">{item.title}</p>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      </section>

      <CarrouselSection data={carrouselItem} />

      {/* <Section
        title='Somos tu mejor aliado.'
        image_url='/bancuadra-1.png'
        color='bg-color_gray_2'
      >
        <p className="font-section text-lg">El Banco de las Oportunidades es el aliado para la economía de los emprendedores, los negocios y las familias de los estratos 1, 2 y 3 de Medellín y sus corregimientos.</p>
      </Section> */}

      <Section
        image_url="/ventajas.svg"
        color="bg-white"
        side_left
        section_title
        strong_title="Ventajas"
        text_title="de nuestros créditos"
        color_title="color_primary_1"
      >
        <div className="mx-auto w-full">
          <div className="mx-auto">
            <div className="bg-color_primary_1 text-white rounded flex justify-around p-1 items-center h-32">
              <div className="flex flex-col text-center">
                <p className="text-5xl font-bold">0.91%</p>
                <p>$9.100 por cada millón</p>
              </div>
              <p className="text-center text-xl font-bold w-28">Interés Mensual</p>
            </div>
            {benefitsItem.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-start text-xl font-bold items-center last:text-xs text-color_primary_1 border border-color_primary_1 rounded-lg mt-1 h-20 p-1"
                >
                  <div className="flex items-center justify-center mx-6 w-20">
                    <img src={item.src} alt="" />
                  </div>
                  <p className="w-8/12">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      <section className="bg-color_gray_2 py-14 h-full " id="requisitos-generales">
        <div className="main-wrapper px-4">
          <SectionTitle color_title="color_primary_2">
            <strong>Requisitos</strong> generales para créditos
          </SectionTitle>
          <div className="flex flex-wrap md:px-4 justify-center">
            {requirementsItem.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-center items-center box-content w-80 my-4 md:mx-4"
                >
                  <div className="rounded-full -mb-10 z-10 bg-white p-3 w-24 h-24">
                    <img src={item.src} alt="img" className="w-full h-full" />
                  </div>
                  <div
                    className={`bg-white text-center text-lg font-semibold p-4 shadow-lg  ${
                      item.class ? 'md:h-36' : 'md:h-60'
                    } `}
                  >
                    <p className="mt-6">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-color_primary_2_ligth pt-10">
        <div className="main-wrapper px-4">
          <SectionTitle color_title="white">
            El banco en <strong>Cifras</strong>
          </SectionTitle>
          <div className="flex flex-col justify-around items-center md:h-64 md:flex-row">
            {figuresItem.map((item, idx) => {
              return (
                <div key={idx} className="text-center text-white pb-14 sm:w-1/2 md:w-1/4">
                  <p className="text-6xl md:text-4xl lg:text-6xl font-bold">{item.number}</p>
                  <p className="text-lg md:text-text-base lg:text-lg font-semibold">
                    {item.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
