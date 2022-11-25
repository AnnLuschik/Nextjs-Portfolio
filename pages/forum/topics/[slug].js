import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import PostItem from 'components/forum/PostItem';
import Replier from 'components/shared/Replier';
import Pagination from 'components/shared/Pagination';
import {
  useGetPostsByTopic,
  useGetTopicBySlug,
  useGetUser,
  useCreatePost
} from 'apollo/hooks';
import WithApollo from 'hoc/withApollo';

const useInitialData = (pagination) => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: dataT } = useGetTopicBySlug({
    variables: { slug }
  });
  const topic = (dataT && dataT.topicBySlug) || null;

  const { data: dataP } = useGetPostsByTopic({
    variables: { slug, ...pagination }
  });
  const postsData = (dataP && dataP.postsByTopic) || { content: [] };

  const { data: dataU } = useGetUser();
  const user = (dataU && dataU.user) || null;

  return { topic, ...postsData, user };
};

const PostsPage = () => {
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 });
  const { topic, content, ...rest } = useInitialData(pagination);

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
        <Posts topic={topic} posts={content} {...pagination} {...rest} />
      </>
    )
  );
};

const Posts = ({ topic, posts, user, totalElements, offset, limit }) => {
  const pageEnd = useRef(null);
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const [createPost, { error }] = useCreatePost();

  const handleCreate = () => {
    setReplyTo(null);
    setReplierOpen(true);
  };

  const handleReply = (reply) => {
    setReplyTo(reply);
    setReplierOpen(true);
  };

  const scrollToBottom = () =>
    pageEnd.current.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = async (data, resetReplier) => {
    if (!data.content) return null;

    const reply = {
      content: data.content,
      topic: topic._id
    };

    if (replyTo) {
      reply.parent = replyTo._id;
    }

    await createPost({ variables: { input: reply } });
    resetReplier();
    setReplierOpen(false);
    scrollToBottom();
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
          <div>
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
          <Pagination totalElements={totalElements} itemsPerPage={5} />
        </div>
      </div>
      <div ref={pageEnd} />
      <Replier
        hasTitle={false}
        isOpen={isReplierOpen}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        onClose={() => setReplierOpen(false)}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default WithApollo(PostsPage);
