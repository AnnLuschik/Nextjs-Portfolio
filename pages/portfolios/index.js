import axios from 'axios';

import PortfolioCard from 'components/portfolios/PortfolioCard';

const fetchPortfolios = () => {
  const query = `query Portfolios {
    portfolios {
      id
      title
      jobTitle
      description
      startDate
      endDate
    }
  }`;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const Portfolios = ({ portfolios }) => {
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="col-md-4">
              <PortfolioCard data={portfolio} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const portfolios = await fetchPortfolios();

  return {
    props: { portfolios }
  };
}

export default Portfolios;
