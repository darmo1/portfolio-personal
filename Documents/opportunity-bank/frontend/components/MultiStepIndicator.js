import React, { useState, useEffect } from 'react'
import Link from 'next/link'
const MultiStepIndicator = ({ paso, solicitud_id, usuario, rol, current, form_type }) => {
  const arrayStep = [1, 2, 3, 4, 5, 6, 7, 8]
  const [screenWidth, setScreenWidth] = useState()

  useEffect(() => {
    setScreenWidth(window.matchMedia('(min-width: 760px)').matches)
    const handleResize = () => setScreenWidth(window.matchMedia('(min-width: 760px)').matches)
    window.addEventListener('resize', handleResize)
  })

  return (
    <React.Fragment>
      <div className="container-steps w-full h-14">
        <ul className="flex h-full relative w-full">
          {arrayStep.map((step, index) => (
            <Step
              key={index}
              step={step}
              current={current}
              paso={paso}
              solicitud_id={solicitud_id}
              usuario={usuario}
              rol={rol}
              screenWidth={screenWidth}
              form_type={form_type}
            />
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default MultiStepIndicator

function Step({ step, current, paso, solicitud_id, usuario, rol, screenWidth, form_type }) {
  var zindex = 10 - step
  var res = paso?.replace(/\D/g, '')

  console.log(res)
  return usuario ? (
    <>
      {form_type === 'deudor' ? (
        <Link
          href={`/individual/${usuario[0]}/${solicitud_id || usuario[1]}?paso=FDE_${
            step + 1
          }&rol=${rol}`}
        >
          <div className={`step z-card-${zindex} ${step == res - 1 && '-current'}`}>
            <i className="icon"></i>
            <p className="step-text text-lg md:text-xs lg:text-sm z-card-2 font-semibold ml-5 sm:ml-6 md:ml-2">
              {' '}
              {!screenWidth ? step : 'Paso ' + step}
            </p>
            <div className="arrow z-card-1"></div>
          </div>
        </Link>
      ) : (
        <Link
          href={`/codeudor/${usuario[0]}/${
            solicitud_id || usuario[1]
          }?paso=FCO_${step}&rol=${rol}`}
        >
          <div className={`step z-card-${zindex} ${step == res && '-current'}`}>
            <i className="icon"></i>
            <p className="step-text text-lg md:text-xs lg:text-sm z-card-2 font-semibold ml-5 sm:ml-6 md:ml-2">
              {' '}
              {!screenWidth ? step : 'Paso ' + step}
            </p>
            <div className="arrow z-card-1"></div>
          </div>
        </Link>
      )}
    </>
  ) : null
}
