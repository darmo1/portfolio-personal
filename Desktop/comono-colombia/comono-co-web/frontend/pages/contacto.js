import * as React from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useRouter } from 'next/router'
import ContactForm from "../components/ContactForm";
import ES from '../utils/ES'
import EN from '../utils/EN'

const Contact = () => {
	const router = useRouter()
	const { locale } = router

	const textForm = {
    ES:{head: 'Gracias por llegar hasta aqui', message: 'Nos comunicaremos lo antes posible'},
    EN:{head: 'Thank you for coming up to here', message: 'Send us your details and we will contact you'}
  }

  React.useEffect( () => Aos.init({duration:2000}), [])

	return (
		<>
			<div>
				<div className="main-container" >
					<img className="contact-title" src="contact-title.svg" alt="contact-title" data-aos="fade-down"/>
				</div>
				<div className="main-container">
					<p className="subtitle" data-aos="fade-right">{ locale === 'es-CO' ? ES.contact.touch_subtitle  : EN.contact.touch_subtitle}</p>
				</div>
				<section className="location-section main-container" >
					<div className="data-container" data-aos="fade-right">
						<div>
							<div className="contact-data">
								<p><strong>{ locale === 'es-CO' ? ES.contact.email  : EN.contact.email}</strong></p>
								<div >
									<img src="envelope-icon.svg" alt="envelope-icon" />
									<p>hello@comono.co</p>
								</div>
							</div>
							<div className="contact-data">
								<p><strong>{ locale === 'es-CO' ? ES.contact.contact  : EN.contact.contact}</strong></p>
								<div>
									<img src="/ring-icon.svg" alt="ring-icon" />
									<p>keren@comono.co</p>
								</div>
							</div>

							<div className="contact-data">
								<p><strong>Whatsapp</strong></p>
								<div>
									<img src="/whatsapp.svg" alt="whats-icon" />
									<p>+57 313 580 5122</p>
								</div>
							</div>

							<div className="contact-data">
								<p><strong>{ locale === 'es-CO' ? ES.contact.location  : EN.contact.location}</strong></p>
								<div>
									<img src="/location-button.svg" alt="location-icon" />
									<p>Selina Medellín</p>
								</div>
							</div>
						</div>
					</div>
					<div className="map-container" data-aos="fade-left">
						<div>
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.6052979452919!2d-75.56451626108506!3d6.208044369457274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442828108b8341%3A0xddac84f16063b76c!2sSelina%20Medellin!5e0!3m2!1sen!2sco!4v1629244050182!5m2!1sen!2sco" loading="lazy"></iframe>
						</div>
						<p id="form">{ locale === 'es-CO' ? ES.contact.message  : EN.contact.message}</p>
					</div>
				</section>

				<div className="main-container" >
					<p className="subtitle">{ locale === 'es-CO' ? ES.contact.data_subtitle  : EN.contact.data_subtitle}</p>
				</div>
				<ContactForm textForm={textForm} locale={locale} />

			</div>

			<style jsx>{`

.contact-title {
  width: 35%;
  margin: 3rem auto 2rem auto;
  display: block;
}

.main-container {
  max-width: 90rem;
  margin: 0 auto;
}
.location-section {
  display: flex;
  justify-content:center;
}

.data-container {
  width: 40%;
}

.data-container > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.contact-data {
  width: 250px;
  margin: 0 auto 2rem auto;
}

.contact-data > div {
  display: flex;
  margin-top: 1rem;
  font-family: "Lexend Exa", sans-serif;
}

.contact-data img {
  margin-right: 0.5rem;
  width: 20px;
}

.subtitle {
  border-bottom: 1px solid black;
  max-width: 19rem;
  text-align: end;
  padding-bottom: 0.5rem;
  font-size: 1.3rem;
  margin: 2rem 0;
  font-family: "Lexend Exa", sans-serif;
}

.map-container {
  display: flex;
  justify-content: center;
  height: 35rem;
  width: 50%;
  margin:-4rem 1rem 1rem 1rem;
  flex-direction: column;
}

.map-container > div {
  width: 100%;
  height: 100%;
}

.map-container p {
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  box-shadow: 1px -1px 7px -1px rgb(3 0 0 / 65%);
  font-family: "Lexend Exa", sans-serif;
}

iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 760px) {
  .location-section {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .data-container {
    width: 100%;
  }
  .map-container {
    width: 90%;
    margin: 0;
  }
  .contact-data {
    text-align: center;
  }

  .contact-data > div {
    justify-content: center;
  }
}
      `}</style>
		</>

	)

}

export default Contact