import Head from "next/head";
import Container from "../components/Container";
import { annotate, annotationGroup } from "rough-notation";
import styles from "../styles/Home.module.css";
import * as React from "react";
import TimeLine from "../components/TimeLine";

export default function Home() {
  const word1 = React.useRef(null);
  const word2 = React.useRef(null);
  const word3 = React.useRef(null);
  const word4 = React.useRef(null);

 

  const annotateWord = (word, color) => {
    return annotate(word.current, {
      color,
      type: "highlight",
      multiline: true,
      padding: [0, 2],
      iterations: 1,
    });
  };

  React.useEffect(() => {
    const ag = annotationGroup([
      annotateWord(word1, "#FDE68A"),
      annotateWord(word2, "#BAE6FD"),
      annotateWord(word3, "#A7F3D0"),
      annotateWord(word4, "#C7D2FE"),
    ]);
    ag.show();
  }, []);

  return (
    <Container>
      <div>
        <p>
          <span ref={word1}>Danilo</span> <br />
          <span ref={word2}>Frontend Developer and materials science</span>


          Welcome to my website where <span ref={word3}>I share what I'm learning</span>  about
          technology and building great products, <span ref={word4}>becoming a better developer</span> and growing a
          career in tech. Let's hang out on Twitter.
        </p>
      </div>


      <TimeLine />
    </Container>
  );
}
