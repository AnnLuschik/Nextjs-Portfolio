import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';

import withApollo from 'hoc/withApollo';
import Replier from 'components/shared/Replier';
import Button from 'components/shared/Button';
import { GET_TOPICS_BY_CATEGORY, GET_USER } from 'apollo/queries';
import { useCreateTopic } from 'apollo/hooks';

const useTopics = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: dataT } = useQuery(GET_TOPICS_BY_CATEGORY, {
    variables: { category: slug }
  });
  const { data: dataU } = useQuery(GET_USER);

  const user = (dataU && dataU.user) || null;
  const topics = (dataT && dataT.topicsByCategory) || [];

  return { topics, user, slug };
};

const Topics = () => {
  const { topics, user, slug } = useTopics();
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
                <tr key={topic.slug}>
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
