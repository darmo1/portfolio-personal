import { useEffect, useState } from 'react'
import Section from './Section'

const CarrouselSection = props => {
  const { data } = props
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((active + 1) % data.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [active, setActive, data])

  return (
    <>
      <Section title={data[active].title} image_url={data[active].src} color="bg-color_gray_2">
        <p className="font-section font-semibold text-lg">{data[active].text}</p>
        <div className="flex justify-center items-center">
          {data.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(index)
              }}
              className={`rounded-full h-3 w-3 mt-14 bg-color_gray_4 mx-1 ${
                active === index && 'bg-yellow-500 h-4 w-4'
              }`}
            />
          ))}
        </div>
      </Section>
    </>
  )
}

export default CarrouselSection
