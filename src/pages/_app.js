import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';

import NavBar from 'components/shared/Navbar';
import Hero from 'components/shared/Hero';
import Footer from 'components/shared/Footer';
import { useApollo } from 'apollo/client';

const App = ({ Component, pageProps }) => {
  const isHome =
    Component.displayName?.includes('Home') || Component.name?.includes('Home');

  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="portfolio-app">
        <NavBar />
        {isHome && <Hero />}
        <div className="container mb-5">
          <Component {...pageProps} />
        </div>
        {isHome && <Footer />}
        <ToastContainer
          position="top-right"
          theme="colored"
          closeOnClick
          pauseOnFocusLoss
        />
      </div>
    </ApolloProvider>
  );
};

export default App;
