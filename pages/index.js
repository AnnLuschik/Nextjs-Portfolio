import Link from 'next/link';

import PortfolioCard from 'components/portfolios/PortfolioCard';
import TopicLink from 'components/forum/TopicLink';
import { useGetHighlighted } from 'apollo/hooks';
import withApollo from 'hoc/withApollo';

const useInitialData = () => {
  const { data } = useGetHighlighted({ variables: { limit: 3 } });
  const portfolios = (data && data.highlight.portfolios) || [];
  const topics = (data && data.highlight.topics) || [];

  return { portfolios, topics };
};

const Home = () => {
  const { portfolios, topics } = useInitialData();

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
          {portfolios &&
            portfolios.length > 0 &&
            portfolios.map((portfolio) => (
              <div className="col-md-4" key={portfolio.id}>
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
      <Link href="/portfolios" className="btn btn-main bg-blue ttu">
        See More Portfolios
      </Link>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Ask Me</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="list-group">
          {topics &&
            topics.length > 0 &&
            topics.map((topic) => <TopicLink key={topic.id} data={topic} />)}
        </div>
      </section>
      <Link href="/forum/categories" className="btn btn-main bg-blue ttu">
        See More Posts
      </Link>
    </>
  );
};

export default withApollo(Home);
