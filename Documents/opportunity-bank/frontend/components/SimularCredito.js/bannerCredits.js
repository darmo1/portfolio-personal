import React from 'react'
import Link from 'next/link'

const BannerCredits = () => {
  return (
    <div className="flex flex-col md:flex-row border-2 p-6 items-center justify-between rounded-lg my-6">
      <p className="pb-4 md:pb-0 text-lg font-semibold">
        Si no conoces nuestras líneas de créditos...{' '}
      </p>
      <Link href="/creditos">
        <a className="text-color_primary_2_ligth px-4 py-2 border  border-color_primary_2_ligth rounded-full font-semibold">
          Conócelas aquí
        </a>
      </Link>
    </div>
  )
}

export default BannerCredits
