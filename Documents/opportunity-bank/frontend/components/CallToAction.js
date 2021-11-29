import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const CallToAction = () => {
  return (
    <Link href="https://api.whatsapp.com/send?phone=573044653088">
      <a>
        <div className="fixed bottom-4 right-4 z-50">
          <Image src={'/whatsapp.png'} width="45" height="45" />
        </div>
      </a>
    </Link>
  )
}

export default CallToAction
