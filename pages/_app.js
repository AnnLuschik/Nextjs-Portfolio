import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/index.scss';

import NavBar from 'components/shared/NavBar';
import Hero from 'components/shared/Hero';
import Footer from 'components/shared/Footer';

const App = ({ Component, pageProps }) => {
  return (
    <div className="portfolio-app">
      <NavBar />
      {Component.name === 'Home' && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {Component.name === 'Home' && <Footer />}
    </div>
  );
};

export default App;
