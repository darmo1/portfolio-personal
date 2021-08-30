import Head from "next/head";
import Container from "../components/Container";

import styles from "../styles/Home.module.css";
import * as React from "react";
import TimeLine from "../components/TimeLine";
import About from "../components/About";

export default function Home() {
 

  return (
    <Container>

      <About />
      

      <TimeLine />
    </Container>
    
  );
}
