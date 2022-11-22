import { useState } from 'react';
import { useRouter } from 'next/router';

import PostItem from 'components/forum/PostItem';
import Replier from 'components/shared/Replier';
import {
  useGetPostsByTopic,
  useGetTopicBySlug,
  useGetUser
} from 'apollo/hooks';
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

  const { data: dataU } = useGetUser();
  const user = (dataU && dataU.user) || null;

  return { topic, loading, error, posts, user };
};

const PostsPage = () => {
  const { topic, loading, error, posts, user } = useInitialData();

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
        <Posts topic={topic} posts={posts} user={user} />
      </>
    )
  );
};

const Posts = ({ topic, posts, user }) => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCreate = () => {
    setReplyTo(null);
    setReplierOpen(true);
  };

  const handleReply = (reply) => {
    setReplyTo(reply.user.username);
    setReplierOpen(true);
  };

  return (
    <section className="pb-5">
      <div className="fj-post-list">
        <PostItem post={topic} className="topic-post-lead" />
        {posts.length > 0 &&
          posts.map((post) => (
            <div className="row" key={post.slug}>
              <div className="col-md-9">
                <PostItem
                  post={post}
                  onReply={handleReply}
                  canCreate={!!user}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user ? (
              <div className="pt-2 pb-2">
                <button
                  className="btn btn-lg btn-outline-primary"
                  type="button"
                  onClick={handleCreate}
                >
                  Create New Post
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Replier
        hasTitle={false}
        isOpen={isReplierOpen}
        replyTo={replyTo || topic.title}
        onClose={() => setReplierOpen(false)}
        onSubmit={() => {}}
      />
    </section>
  );
};

export default WithApollo(PostsPage);
