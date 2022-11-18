import { useState } from 'react';
import { useQuery } from '@apollo/client';

import withApollo from 'hoc/withApollo';
import Replier from 'components/shared/Replier';
import Button from 'components/shared/Button';
import { GET_TOPICS_BY_CATEGORY, GET_USER } from 'apollo/queries';

const Topics = ({ topics }) => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const { data } = useQuery(GET_USER);

  const user = (data && data.user) || null;

  const createTopic = (data, done) => {
    alert(JSON.stringify(data));
    done();
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
          onSubmit={createTopic}
        />
      </section>
    </>
  );
};

Topics.getInitialProps = async ({ apolloClient, query }) => {
  const response = await apolloClient.query({
    query: GET_TOPICS_BY_CATEGORY,
    variables: { category: query.slug }
  });

  return {
    topics: response.data.topicsByCategory
  };
};

export default withApollo(Topics);
