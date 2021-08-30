import * as React from "react";
import Link from "next/link";
import { annotate, annotationGroup } from "rough-notation";
import daniloImg from "../public/danilo-profile.jpg";
import Image from "next/image";

const About = () => {
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
    <div className="">
      <div className="max-w-4xl mx-auto flex flex-wrap">
        <div className=" p-4  lg:w-1/2 ">
          <div className="">
            <p>
              <span className="text-2xl font-bold text-gray-900  mr-4 lg:text-4xl">
                Hi!
              </span>
              <h1
                className="inline-block text-2xl font-bold text-gray-900 lg:text-4xl"
                ref={word1}
              >
                I'm Danilo
              </h1>
            </p>

            <br />
            <div className="mt-4 leading-8 ">
              <p ref={word2} className="text-gray-800 inline-block">
                Frontend Developer and materials science.
              </p>
              <br />
              <span>
                Welcome to my website where{" "}
                <p ref={word3} className="text-gray-800 inline-block">
                  I share what I'm learning
                </p>{" "}
                about technology and building great products,{" "}
                <p ref={word4} className="text-gray-800 inline-block">
                  becoming a better developer
                </p>{" "}
                and growing a career in tech. Let's hang out on{" "}
                <Link href={"https://www.twitter.com/darmo10"}>
                  <a className="font-bold transition-colors hover:text-sky-500">
                    Twitter
                  </a>
                </Link>{" "}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex-shrink-0 mt-6 px-8 py-4 mb-4 lg:w-1/2  lg:my-6 flex justify-center items-center">
          <Image
            src={daniloImg}
            alt="danilo-profile"
            className="rounded-full"
            placeholder="blur"
            priority={true}
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
