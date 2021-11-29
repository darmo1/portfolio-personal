import * as React from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import { sanityClient } from "../lib/sanity";
import ComonoScreen from "../components/ComonoScreen";

const Layout = ({ children }) => {
  const router = useRouter();
  const { locale } = router;

  const [dataFooter, setDataFooter] = React.useState(null);
  const queryFooter = `*[_type == 'infoCompany']{
        _id,
        address,
        city,
        country,
        email,
        name,
        phone,
        socialmedia{
            twitter,
            instagram,
            facebook
        } 
      }`;

  React.useEffect(async () => {
    const dataFetch = await sanityClient.fetch(queryFooter);
    setDataFooter(dataFetch);
  }, []);

  return (
    <div className="base-layout">
        
      <NavBar locale={locale} />
      <CallToAction />
      {children}
      <Footer data={dataFooter} />
    </div>
  );
};

export default Layout;
