import { useState, useRef } from 'react';

// Components
import PostItem from 'components/forum/PostItem';
import Replier from 'components/shared/Replier';
import Pagination from 'components/shared/Pagination';

// Hooks
import { useCreatePost } from 'apollo/hooks';

const Posts = ({ topic, posts, user, ...pagination }) => {
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
        {pagination.pageNum === 1 && (
          <PostItem post={topic} className="topic-post-lead" />
        )}

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
            {posts.length > 0 && (
              <div className="pagination-container ms-auto">
                <Pagination {...pagination} />
              </div>
            )}
          </div>
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

export default Posts;
