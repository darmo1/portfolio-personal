import Document, { Html, Head, Main, NextScript } from 'next/document'
import ComonoScreen from '../components/ComonoScreen'

class MyDocument extends Document {


  render() {
    return (
      <Html>
         <Head>
           <link 
            rel="stylesheet"
            href='https://fonts.googleapis.com/css2?family=Lexend+Exa&family=Lexend+Tera&family=Roboto:wght@200;400;500;700&display=swap'
            crossOrigin=""
            />
            <link rel="icon" href="/favicon-comono.ico" />
            
         </Head>
        <body>
          <Main />
          <NextScript />
          <ComonoScreen />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument