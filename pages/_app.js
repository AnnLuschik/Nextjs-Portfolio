import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

import { ToastContainer } from 'react-toastify';

import NavBar from 'components/shared/Navbar';
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
      <ToastContainer
        position="bottom-right"
        theme="colored"
        closeOnClick
        pauseOnFocusLoss
      />
    </div>
  );
};

export default App;
