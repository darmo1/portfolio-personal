import * as React from "react";
import { useRouter } from "next/router";
import ServiceMenu from "../components/ServiceMenu";
import ServiceDigital from "../components/ServiceDigital";
import ServiceDetail from "../components/ServiceDetail";
import ServiceAdvantages from "../components/ServiceAdvantages";
import ServiceSoftware from "../components/ServiceSoftware";
import ServiceNavBar from "../components/ServiceNavBar";
import ServiceTextPlane from "../components/ServiceTextPlane";
import { sanityClient } from "../lib/sanity";

const servicios = ({ services }) => {
  const { locale } = useRouter();
  const data = locale === "es-CO" ? services["es-CO"] : services["en-US"];
  const [cloudSolution, customSoftware, webSite] = data.dataService;

  return (
    <>
      <ServiceMenu locale={locale}/>

      <ServiceDigital
        borderRadius="45%"
        minHeight="70vh"
        minWidth="100%"
        background="#CEAED6"
        rotate="15deg"
        marginLeft="-2rem"
        word={
          locale === "es-CO"
            ? {
                one: "Páginas web,",
                two: "aplicaciones",
                three: "web y",
                four: "moviles",
                servicename: 'Páginas web, aplicaciones web y móviles',
                color: "#C473CB",
              }
            : {
                servicename: 'Web sites, web mobil and apps',
                color: "#C473CB",
              }
        }
        info={webSite}
        id="web-app"
      />
      {/* <section className="sticky">
   <ServiceNavBar />
 </section> */}

      <ServiceDetail data={webSite} color="#C473CB" />

      <>
        <ServiceDigital
          background="#94D2DD"
          word={
            locale === "es-CO"
              ? {
                  servicename: 'Soluciones en la nube',
                  color: "#04ACC5",
                }
              : {
                  servicename: 'Cloud Solution',
                  color: "#04ACC5",
                }
          }
          info={cloudSolution}
          id="nube"
        />
        <ServiceDetail data={cloudSolution} />

        <section className="service-detail">
          <ServiceAdvantages advantages={cloudSolution} locale={locale} />
        </section>
      </>

      <>
        <ServiceDigital
          borderRadius="45%"
          minHeight="60vh"
          minWidth="80%"
          background="#C6ED88"
          rotate="30deg"
          marginLeft="-3rem"
          word={
            locale === "es-CO"
              ? {
                  servicename: 'Software a la medida',
                  color: "#AFD342",
                }
              : {
                  servicename: 'Custom Software',
                  color: "#AFD342",
                }
          }
          info={customSoftware}
          id="software"
        />
        <ServiceSoftware locale={locale} />
        <ServiceTextPlane locale={locale} />
        <ServiceDetail data={customSoftware} />
      </>
      <style jsx>{`
        .sticky {
          /* max-width:80rem;
          position: sticky;
          margin-top: -100px;
          top: 91vh;
          margin:auto;
          z-index:1; */
        }

        .service-detail {
          overflow-y: none;
          overflow-x: hidden;
          padding-top: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 540px) {
          .sticky {
            position: sticky;
            bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default servicios;

const queryService = `*[_type == 'service']{
   name,
  'serviceExtract':descriptionSection.serviceExtract,
  'serviceAdvantage': descriptionSection.serviceAdvantage,
  'serviceInfo': descriptionSection.sectionScreen,
}

  `;

const queryServiceEnglish = `*[_type == 'serviceEnglish']{
    name,
   'serviceExtract':descriptionSection.serviceExtract,
   'serviceAdvantage': descriptionSection.serviceAdvantage,
   'serviceInfo': descriptionSection.sectionScreen,
 }
 
   `;

export async function getStaticProps() {
  const dataService = await sanityClient.fetch(queryService);
  const dataServiceEnglish = await sanityClient.fetch(queryServiceEnglish);

  return {
    props: {
      services: {
        "es-CO": { dataService },
        "en-US": { dataService: dataServiceEnglish },
      },
    },

    revalidate: 10,
  };
}
