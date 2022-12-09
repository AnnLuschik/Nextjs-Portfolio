import Link from 'next/link';

import PortfolioCard from 'components/portfolios/PortfolioCard';
import { useGetPortfolios } from 'apollo/hooks';

const Portfolios = () => {
  const { data } = useGetPortfolios();
  const portfolios = data?.portfolios || [];

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
                className="card-link mb-2"
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

export default Portfolios;
