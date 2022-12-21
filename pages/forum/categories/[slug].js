import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useQuery } from '@apollo/client';

// Components
import Replier from 'components/shared/Replier';
import Button from 'components/shared/Button';

// Hooks
import { useCreateTopic } from 'apollo/hooks';

// Misc
import { GET_TOPICS_BY_CATEGORY, GET_USER } from 'apollo/queries';
import { PATH_TOPIC } from 'constants/paths';
import { initializeApollo, addApolloState } from 'apollo/client';

const Topics = ({ category, topics, slug }) => {
  const router = useRouter();
  const [isReplierOpen, setReplierOpen] = useState(false);

  const { data: userData } = useQuery(GET_USER);
  const user = userData?.user || null;

  const [createTopic, { error }] = useCreateTopic();

  const handleCreateTopic = async (data, done) => {
    await createTopic({
      variables: { input: { ...data, forumCategory: slug } }
    });
    if (!error) {
      setReplierOpen(false);
      done();
    }
  };

  const goToTopic = (slug) => {
    router.push({ pathname: PATH_TOPIC, query: { slug } });
  };

  const title = `Forum - ${category}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Select a Topic</h1>
            <Button
              text="Create Topic"
              onClick={() => setReplierOpen(true)}
              disabled={!user}
              tooltip={!user ? 'Log in to create a topic' : ''}
            />
          </div>
        </div>
      </section>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 &&
              topics.map((topic) => (
                <tr key={topic.slug} onClick={() => goToTopic(topic.slug)}>
                  <th>{topic.title}</th>
                  <td className="category">{topic.forumCategory.title}</td>
                  <td>{topic.user.username}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Replier
          isOpen={isReplierOpen}
          onClose={() => setReplierOpen(false)}
          onSubmit={handleCreateTopic}
        />
      </section>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();
  const { slug } = ctx.params;

  const { data } = await apolloClient.query({
    query: GET_TOPICS_BY_CATEGORY,
    variables: { category: slug }
  });

  return addApolloState(apolloClient, {
    props: {
      category: data?.topicsByCategory.category,
      topics: data?.topicsByCategory.data || [],
      slug
    }
  });
}

export default Topics;
