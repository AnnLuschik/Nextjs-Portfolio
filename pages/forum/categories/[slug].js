import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

// Components
import Replier from 'components/shared/Replier';
import Button from 'components/shared/Button';
import withApollo from 'hoc/withApollo';

// Hooks
import { useCreateTopic } from 'apollo/hooks';

// Misc
import { GET_TOPICS_BY_CATEGORY, GET_USER } from 'apollo/queries';
import { PATH_TOPIC } from 'constants/paths';

const useTopics = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: topicsData } = useQuery(GET_TOPICS_BY_CATEGORY, {
    variables: { category: slug }
  });
  const { data: userData } = useQuery(GET_USER);

  const user = userData?.user || null;
  const topics = topicsData?.topicsByCategory || [];

  return { topics, user, slug, router };
};

const Topics = () => {
  const { topics, user, slug, router } = useTopics();
  const [isReplierOpen, setReplierOpen] = useState(false);

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

  return (
    <>
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

export default withApollo(Topics);
