import React from "react";
import { sanityClient } from "../lib/sanity";
import Slider from "../components/Slider";

export default function Nosotros({ data }) {
  return ( <Slider dataSlides={data} />)
}

const queryOurTeam = `
*[_type == 'ourTeam']{
_id,
order,
href,
'imageURL': image.asset._ref,
  name,
  fontColor,
  backgroundColor,
  profile,
skill
}`;

const queryOurTeamEnglish = `
*[_type == 'ourTeamEnglish']{
_id,
order,
href,
'imageURL': image.asset._ref,
  name,
  fontColor,
  backgroundColor,
  profile,
skill
}`;

export async function getStaticProps() {
  const response = await sanityClient.fetch(queryOurTeam);
  const responseEnglish = await sanityClient.fetch(queryOurTeamEnglish);
  return { props: { 
                    'data' : {'es-CO':[...response], 
                              'en-US':[...responseEnglish]
                              }
                  }, revalidate: 10 };
}
