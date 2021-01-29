import React from "react"
import Form from "../components/Form"
import Layout from "../components/Layout"
import Slides from "../components/Slides"
import Services from "../components/Services"
import Prices from "../components/Prices"
import "../style/hjem.css"
import Cover from "../components/Cover"

export default function Home() {
  return (
    <div className="body">
      <Layout>
        <Cover>
          <h3 className="presentation__text-over p-15-20 container--green t-center">
            ØKONOMIHJELP FOR STARTUPS
          </h3>
          <a href="#contact">
            <button className="btn btn-contact p-15-20"> KONTAKT OSS </button>
          </a>
        </Cover>
        <Services />
        <Prices />
        <Cover>
          <h1 className="box container--green">KONTAKT OSS</h1>
          <Form id="contact" />
        </Cover>
        <Slides />
      </Layout>
    </div>
  )
}
