import Link from 'next/link';

import PortfolioCard from 'components/portfolios/PortfolioCard';
import withApollo from 'hoc/withApollo';
import { GET_PORTFOLIOS } from 'apollo/queries';

const Portfolios = ({ data }) => {
  const portfolios = (data && data.portfolios) || [];

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
              <Link
                href={`/portfolios/${encodeURIComponent(portfolio.id)}`}
                className="card-link"
              >
                <PortfolioCard data={portfolio} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

Portfolios.getInitialProps = async ({ apolloClient }) => {
  const { data } = await apolloClient.query({ query: GET_PORTFOLIOS });
  return {
    data
  };
};

export default withApollo(Portfolios);
