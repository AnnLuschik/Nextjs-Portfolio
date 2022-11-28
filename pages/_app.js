import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

import { ToastContainer } from 'react-toastify';

import NavBar from 'components/shared/Navbar';
import Hero from 'components/shared/Hero';
import Footer from 'components/shared/Footer';

const App = ({ Component, pageProps }) => {
  const isHome = Component.displayName.includes('Home');

  return (
    <div className="portfolio-app">
      <NavBar />
      {isHome && <Hero />}
      <div className="container">
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
  );
};

export default App;
