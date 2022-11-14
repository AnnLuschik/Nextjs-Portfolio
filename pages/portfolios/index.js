import Link from 'next/link';

import PortfolioCard from 'components/portfolios/PortfolioCard';
import {
  useUpdatePortfolio,
  useDeletePortfolio,
  useCreatePortfolio
} from 'apollo/hooks';
import withApollo from 'hoc/withApollo';
import { GET_PORTFOLIOS } from 'apollo/queries';

const Portfolios = ({ data }) => {
  const [createPortfolio] = useCreatePortfolio();
  const [updatePortfolio] = useUpdatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();

  const portfolios = (data && data.portfolios) || [];

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={createPortfolio}
          className="btn btn-primary"
        >
          Create Portfolio
        </button>
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

              <button
                type="button"
                onClick={() =>
                  updatePortfolio({ variables: { id: portfolio.id } })
                }
                className="btn btn-warning"
              >
                Update Portfolio
              </button>
              <button
                type="button"
                onClick={() =>
                  deletePortfolio({ variables: { id: portfolio.id } })
                }
                className="btn btn-danger"
              >
                Delete Portfolio
              </button>
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
