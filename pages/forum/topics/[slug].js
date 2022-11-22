import { useRouter } from 'next/router';

import PostItem from 'components/forum/PostItem';
import { useGetPostsByTopic, useGetTopicBySlug } from 'apollo/hooks';
import WithApollo from 'hoc/withApollo';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: dataT,
    loading,
    error
  } = useGetTopicBySlug({ variables: { slug } });
  const topic = (dataT && dataT.topicBySlug) || null;

  const { data: dataP } = useGetPostsByTopic({ variables: { slug } });
  const posts = (dataP && dataP.postsByTopic) || [];

  return { topic, loading, error, posts };
};

const Posts = () => {
  const { topic, loading, error, posts } = useInitialData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    topic && (
      <>
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>{topic.title}</h1>
            </div>
          </div>
        </section>
        <section>
          <div className="fj-post-list">
            <PostItem post={topic} className="topic-post-lead" />
            {posts.length > 0 &&
              posts.map((post) => (
                <div className="row" key={post.slug}>
                  <div className="col-md-9">
                    <PostItem post={post} />
                  </div>
                </div>
              ))}
          </div>
        </section>
      </>
    )
  );
};

export default WithApollo(Posts);
