import Head from "next/head";
import GlobalStyle from "../styles/global-styles";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Test Page</title>
        <meta name="description" content="Test Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
