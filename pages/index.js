import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// Components
import PortfolioCard from 'components/portfolios/PortfolioCard';
import TopicLink from 'components/forum/TopicLink';

// Misc
import { PATH_CATEGORIES, PATH_PORTFOLIOS } from 'constants/paths';
import { initializeApollo, addApolloState } from 'apollo/client';
import { GET_HIGHLIGHTED } from 'apollo/queries';
import { disposeQueryMessage } from 'helpers';
import { messages } from 'constants/messages';

const Home = ({ portfolios, topics }) => {
  const router = useRouter();
  const { message } = router.query;

  disposeQueryMessage(message);

  useEffect(() => {
    if (message) {
      toast.error(messages[message].value, { autoClose: 2000 });
    }
  }, [message]);

  return (
    <>
      <Head>
        <title>Portfolio App</title>
        <meta
          name="description"
          content="Look and create portfolios, read posts and discuss on the forum"
        />
      </Head>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios?.length > 0 &&
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
      <Link href={PATH_PORTFOLIOS} className="btn btn-main bg-blue ttu">
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
          {topics?.length > 0 &&
            topics.map((topic) => <TopicLink key={topic.slug} data={topic} />)}
        </div>
      </section>
      <Link href={PATH_CATEGORIES} className="btn btn-main bg-blue ttu">
        See More Posts
      </Link>
    </>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_HIGHLIGHTED,
    variables: { limit: 3 }
  });

  const portfolios = data?.highlight.portfolios || [];
  const topics = data?.highlight.topics || [];

  return addApolloState(apolloClient, {
    props: { portfolios, topics }
  });
}

Home.displayName = 'Home';
export default Home;
