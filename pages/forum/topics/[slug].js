import { useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Posts from 'components/forum/Posts';

// Hooks
import {
  useGetPostsByTopic,
  useGetTopicBySlug,
  useGetUser
} from 'apollo/hooks';

// Misc
import withApollo from 'hoc/withApollo';

const useInitialData = (pagination) => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: dataT } = useGetTopicBySlug({
    variables: { slug }
  });
  const topic = (dataT && dataT.topicBySlug) || null;

  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination }
  });
  const postsData = (dataP && dataP.postsByTopic) || { content: [] };

  const { data: dataU } = useGetUser();
  const user = (dataU && dataU.user) || null;

  return { topic, ...postsData, user, fetchMore };
};

const PostsPage = () => {
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 5 });
  const { topic, content, fetchMore, ...rest } = useInitialData(pagination);

  const handlePageChange = (pageNum, pageSize) => {
    setPagination({ pageNum, pageSize });
    fetchMore({
      variables: {
        pageNum,
        pageSize
      }
    });
  };

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
        <Posts
          topic={topic}
          posts={content}
          {...pagination}
          {...rest}
          onPageChange={handlePageChange}
        />
      </>
    )
  );
};

export default withApollo(PostsPage);
