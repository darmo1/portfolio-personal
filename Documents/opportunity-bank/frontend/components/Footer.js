import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer = ({ image }) => {
  const [banner, setBanner] = useState(false)
  const router = useRouter()
  const currentUrl = router.pathname

  useEffect(() => {
    currentUrl.includes('backoffice') ? setBanner(true) : setBanner(false)
  }, [router])

  return (
    <footer>
       {banner &&  (
        <div className="main-wrapper flex flex-col md:flex-row">
          <div className="flex items-center flex-col-reverse md:flex-row">
            <img src="/footer-image.png" alt="footer-image" className="md:w-2/3" />
            <p className="text-2xl text-color_primary_2_ligth font-semibold px-20 p-8 md:pt-0 md:pb-0 md:pl-0 md:pr-16 text-center md:border-r-2">
              Cumplir tus sueños nunca fue tan fácil
            </p>
          </div>
           <div className="flex md:w-1/3">
            <img
              src="/logo-alcaldia.svg"
              alt="logo-alcaldia"
              className="flex  px-16 py-8  md:pl-16 md:pr-8 md:py-0"
            />
          </div> 
        </div>
      ) }

   {/* 
   
      // : (
      //   <div className="main-wrapper flex items-center h-52">
      //      <img
      //       src="/logo-alcaldia.svg"
      //       alt="logo-alcaldia"
      //       className="w-2/3 md:w-2/5 mx-auto"
      //     /> 
      //   </div>
      // )} */}
 

      <div className="bg-color_gray_2">
        <div className="main-wrapper flex flex-col p-12 md:p-20 md:h-96 md:flex-row md:justify-around">
          <div className="mb-8 mx-8">
            <h4 className="text-color_primary_1_ligth text-xl font-semibold mb-3">Menu</h4>
            <ul className="list-disc list-outside">
              <Link href="/creditos">
                <a>
                  <li className="mb-2">Líneas de crédito</li>
                </a>
              </Link>
              <Link href="/programas">
                <a>
                  <li className="mb-2">Programas</li>
                </a>
              </Link>
              <Link href="/oportunidades">
                <a>
                  <li className="mb-2">+Oportunidades</li>
                </a>
              </Link>
            </ul>
          </div>

          <div className="mb-8 mx-8">
            <h4 className="text-color_primary_1_ligth text-xl font-semibold mb-3">
              Accesos rápidos
            </h4>
            <ul className="list-disc list-outside">
              <Link href="/switch">
                <a>
                  <li className="mb-2">Solicita un crédito</li>
                </a>
              </Link>
              <Link href="/simular-credito">
                <a>
                  <li className="mb-2">Simulador de crédito</li>
                </a>
              </Link>
            </ul>
          </div>

          <div className="mb-8 mx-8">
            <h4 className="text-color_primary_1_ligth text-xl font-semibold mb-3">
              Contáctanos
            </h4>
            <ul className="list-disc list-outside">
              <li className="mb-2">hola@bancooportunidades.com</li>

              <li className="mb-2">300 256 36 58</li>

              <li>
                <div className="flex mb-2">
                  Calle 18 # 56 - 85 <br />
                  Centro administrativo la Alpujarra
                </div>
              </li>
              <li>Directorio CEDEZO</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-color_primary_2_dark h-16 ">
        <div className="main-wrapper flex items-center">
          <img src="/Logo-Alcadia-y-GOV.svg" alt="Logo-Alcadia-y-GOV" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
