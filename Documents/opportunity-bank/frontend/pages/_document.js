import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://kit.fontawesome.com/6f0606103a.js"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body className="font-body relative">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
